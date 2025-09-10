from flask import Blueprint, request, jsonify
from src.models.user import db
from src.models.content import Content
from src.models.trend_management import (
    TrendPhase, TrendScore, TrendAlert, TrendCorrelation, 
    TrendHistory, TrendMetrics, TrendTag
)
from datetime import datetime, timedelta
import json

trend_bp = Blueprint('trend', __name__)

# Trend Phases Management
@trend_bp.route('/api/trend-phases', methods=['GET'])
def get_trend_phases():
    """Alle Trend-Phasen abrufen"""
    phases = TrendPhase.query.order_by(TrendPhase.order).all()
    return jsonify([phase.to_dict() for phase in phases])

@trend_bp.route('/api/trend-phases', methods=['POST'])
def create_trend_phase():
    """Neue Trend-Phase erstellen"""
    data = request.get_json()
    
    phase = TrendPhase(
        name=data['name'],
        description=data.get('description'),
        order=data['order'],
        color=data.get('color', '#6B7280')
    )
    
    db.session.add(phase)
    db.session.commit()
    
    return jsonify(phase.to_dict()), 201

# Trend Scoring
@trend_bp.route('/api/contents/<int:content_id>/scores', methods=['GET'])
def get_content_scores(content_id):
    """Alle Scores für einen Content abrufen"""
    content = Content.query.get_or_404(content_id)
    scores = TrendScore.query.filter_by(content_id=content_id).all()
    return jsonify([score.to_dict() for score in scores])

@trend_bp.route('/api/contents/<int:content_id>/scores', methods=['POST'])
def create_content_score(content_id):
    """Neuen Score für Content erstellen"""
    content = Content.query.get_or_404(content_id)
    data = request.get_json()
    
    # Prüfen ob bereits ein Score dieses Typs existiert
    existing_score = TrendScore.query.filter_by(
        content_id=content_id,
        score_type=data['score_type'],
        calculated_by=data.get('calculated_by')
    ).first()
    
    if existing_score:
        # Score aktualisieren
        existing_score.value = data['value']
        existing_score.calculated_at = datetime.utcnow()
        score = existing_score
    else:
        # Neuen Score erstellen
        score = TrendScore(
            content_id=content_id,
            score_type=data['score_type'],
            value=data['value'],
            calculated_by=data.get('calculated_by'),
            is_automatic=data.get('is_automatic', False)
        )
        db.session.add(score)
    
    db.session.commit()
    
    # Priority Score neu berechnen
    content.update_priority_score()
    db.session.commit()
    
    return jsonify(score.to_dict()), 201

# Trend Analytics
@trend_bp.route('/api/trends/analytics/dashboard', methods=['GET'])
def get_trend_dashboard():
    """Dashboard-Daten für Trendanalyse"""
    # Trend-Verteilung nach Phasen
    phase_distribution = db.session.query(
        TrendPhase.name,
        db.func.count(Content.id).label('count')
    ).outerjoin(Content).group_by(TrendPhase.id, TrendPhase.name).all()
    
    # Top-Trends nach Priority Score
    top_trends = Content.query.filter(
        Content.content_type == 'trend'
    ).order_by(Content.priority_score.desc()).limit(10).all()
    
    # Trend-Aktivität der letzten 30 Tage
    thirty_days_ago = datetime.utcnow() - timedelta(days=30)
    recent_activity = Content.query.filter(
        Content.content_type == 'trend',
        Content.created_at >= thirty_days_ago
    ).count()
    
    # Durchschnittliche Scores
    avg_scores = db.session.query(
        TrendScore.score_type,
        db.func.avg(TrendScore.value).label('avg_value')
    ).group_by(TrendScore.score_type).all()
    
    return jsonify({
        'phase_distribution': [{'name': name, 'count': count} for name, count in phase_distribution],
        'top_trends': [trend.to_dict() for trend in top_trends],
        'recent_activity': recent_activity,
        'average_scores': {score_type: float(avg_value) for score_type, avg_value in avg_scores}
    })

# Trend Correlations
@trend_bp.route('/api/trends/correlations', methods=['GET'])
def get_trend_correlations():
    """Trend-Korrelationen abrufen"""
    correlations = TrendCorrelation.query.filter(
        TrendCorrelation.correlation_strength.isnot(None)
    ).order_by(TrendCorrelation.correlation_strength.desc()).limit(50).all()
    
    return jsonify([corr.to_dict() for corr in correlations])

@trend_bp.route('/api/trends/correlations', methods=['POST'])
def create_trend_correlation():
    """Neue Trend-Korrelation erstellen"""
    data = request.get_json()
    
    correlation = TrendCorrelation(
        trend_a_id=data['trend_a_id'],
        trend_b_id=data['trend_b_id'],
        correlation_strength=data['correlation_strength'],
        correlation_type=data.get('correlation_type'),
        confidence_score=data.get('confidence_score')
    )
    
    db.session.add(correlation)
    db.session.commit()
    
    return jsonify(correlation.to_dict()), 201

# Trend Alerts
@trend_bp.route('/api/trend-alerts', methods=['GET'])
def get_trend_alerts():
    """Alle aktiven Trend-Alerts abrufen"""
    user_id = request.args.get('user_id')
    
    query = TrendAlert.query.filter_by(is_active=True)
    if user_id:
        query = query.filter_by(user_id=user_id)
    
    alerts = query.all()
    return jsonify([alert.to_dict() for alert in alerts])

@trend_bp.route('/api/trend-alerts', methods=['POST'])
def create_trend_alert():
    """Neuen Trend-Alert erstellen"""
    data = request.get_json()
    
    alert = TrendAlert(
        content_id=data['content_id'],
        user_id=data['user_id'],
        alert_type=data['alert_type'],
        threshold=data.get('threshold'),
        is_active=data.get('is_active', True)
    )
    
    db.session.add(alert)
    db.session.commit()
    
    return jsonify(alert.to_dict()), 201

@trend_bp.route('/api/trend-alerts/<int:alert_id>', methods=['PUT'])
def update_trend_alert(alert_id):
    """Trend-Alert aktualisieren"""
    alert = TrendAlert.query.get_or_404(alert_id)
    data = request.get_json()
    
    alert.is_active = data.get('is_active', alert.is_active)
    alert.threshold = data.get('threshold', alert.threshold)
    
    db.session.commit()
    
    return jsonify(alert.to_dict())

# Trend History
@trend_bp.route('/api/contents/<int:content_id>/history', methods=['GET'])
def get_content_history(content_id):
    """Trend-Historie für Content abrufen"""
    content = Content.query.get_or_404(content_id)
    history = TrendHistory.query.filter_by(content_id=content_id).order_by(
        TrendHistory.changed_at.desc()
    ).all()
    
    return jsonify([entry.to_dict() for entry in history])

@trend_bp.route('/api/contents/<int:content_id>/history', methods=['POST'])
def create_history_entry(content_id):
    """Neuen Historie-Eintrag erstellen"""
    content = Content.query.get_or_404(content_id)
    data = request.get_json()
    
    history_entry = TrendHistory(
        content_id=content_id,
        phase_id=data.get('phase_id'),
        changed_by=data.get('changed_by'),
        change_type=data['change_type'],
        old_value=data.get('old_value'),
        new_value=data.get('new_value'),
        notes=data.get('notes')
    )
    
    db.session.add(history_entry)
    db.session.commit()
    
    return jsonify(history_entry.to_dict()), 201

# Trend Tags
@trend_bp.route('/api/trend-tags', methods=['GET'])
def get_trend_tags():
    """Alle Trend-Tags abrufen"""
    tags = TrendTag.query.all()
    return jsonify([tag.to_dict() for tag in tags])

@trend_bp.route('/api/trend-tags', methods=['POST'])
def create_trend_tag():
    """Neuen Trend-Tag erstellen"""
    data = request.get_json()
    
    tag = TrendTag(
        name=data['name'],
        description=data.get('description'),
        color=data.get('color', '#6B7280')
    )
    
    db.session.add(tag)
    db.session.commit()
    
    return jsonify(tag.to_dict()), 201

# Content-Tag Zuordnung
@trend_bp.route('/api/contents/<int:content_id>/tags', methods=['POST'])
def add_tag_to_content(content_id):
    """Tag zu Content hinzufügen"""
    content = Content.query.get_or_404(content_id)
    data = request.get_json()
    
    tag = TrendTag.query.get_or_404(data['tag_id'])
    
    if tag not in content.trend_tags:
        content.trend_tags.append(tag)
        db.session.commit()
    
    return jsonify(content.to_dict())

@trend_bp.route('/api/contents/<int:content_id>/tags/<int:tag_id>', methods=['DELETE'])
def remove_tag_from_content(content_id, tag_id):
    """Tag von Content entfernen"""
    content = Content.query.get_or_404(content_id)
    tag = TrendTag.query.get_or_404(tag_id)
    
    if tag in content.trend_tags:
        content.trend_tags.remove(tag)
        db.session.commit()
    
    return jsonify(content.to_dict())

# Trend Phase Update
@trend_bp.route('/api/contents/<int:content_id>/phase', methods=['PUT'])
def update_content_phase(content_id):
    """Trend-Phase für Content aktualisieren"""
    content = Content.query.get_or_404(content_id)
    data = request.get_json()
    
    old_phase_id = content.trend_phase_id
    new_phase_id = data['phase_id']
    
    content.trend_phase_id = new_phase_id
    
    # Historie-Eintrag erstellen
    if old_phase_id != new_phase_id:
        old_phase = TrendPhase.query.get(old_phase_id) if old_phase_id else None
        new_phase = TrendPhase.query.get(new_phase_id) if new_phase_id else None
        
        history_entry = TrendHistory(
            content_id=content_id,
            phase_id=new_phase_id,
            changed_by=data.get('changed_by'),
            change_type='phase_change',
            old_value=old_phase.name if old_phase else 'None',
            new_value=new_phase.name if new_phase else 'None',
            notes=data.get('notes')
        )
        db.session.add(history_entry)
    
    db.session.commit()
    
    return jsonify(content.to_dict())

# Trend Metrics
@trend_bp.route('/api/contents/<int:content_id>/metrics', methods=['GET'])
def get_content_metrics(content_id):
    """Metriken für Content abrufen"""
    content = Content.query.get_or_404(content_id)
    metrics = TrendMetrics.query.filter_by(content_id=content_id).order_by(
        TrendMetrics.period_start.desc()
    ).all()
    
    return jsonify([metric.to_dict() for metric in metrics])

@trend_bp.route('/api/contents/<int:content_id>/metrics', methods=['POST'])
def create_content_metric(content_id):
    """Neue Metrik für Content erstellen"""
    content = Content.query.get_or_404(content_id)
    data = request.get_json()
    
    metric = TrendMetrics(
        content_id=content_id,
        metric_type=data['metric_type'],
        value=data['value'],
        period_start=datetime.fromisoformat(data['period_start']),
        period_end=datetime.fromisoformat(data['period_end'])
    )
    
    db.session.add(metric)
    db.session.commit()
    
    return jsonify(metric.to_dict()), 201

# Bulk Operations
@trend_bp.route('/api/trends/bulk/recalculate-scores', methods=['POST'])
def bulk_recalculate_scores():
    """Alle Priority Scores neu berechnen"""
    trends = Content.query.filter_by(content_type='trend').all()
    updated_count = 0
    
    for trend in trends:
        old_score = trend.priority_score
        new_score = trend.update_priority_score()
        if old_score != new_score:
            updated_count += 1
    
    db.session.commit()
    
    return jsonify({
        'message': f'{updated_count} trends updated',
        'total_trends': len(trends)
    })

# Search and Filter
@trend_bp.route('/api/trends/search', methods=['GET'])
def search_trends():
    """Erweiterte Trend-Suche"""
    query = request.args.get('q', '')
    phase_id = request.args.get('phase_id')
    min_score = request.args.get('min_score', type=float)
    max_score = request.args.get('max_score', type=float)
    tags = request.args.getlist('tags')
    
    # Basis-Query
    trends_query = Content.query.filter_by(content_type='trend')
    
    # Text-Suche
    if query:
        trends_query = trends_query.filter(
            db.or_(
                Content.title.contains(query),
                Content.short_description.contains(query),
                Content.long_description.contains(query)
            )
        )
    
    # Phase-Filter
    if phase_id:
        trends_query = trends_query.filter_by(trend_phase_id=phase_id)
    
    # Score-Filter
    if min_score is not None:
        trends_query = trends_query.filter(Content.priority_score >= min_score)
    if max_score is not None:
        trends_query = trends_query.filter(Content.priority_score <= max_score)
    
    # Tag-Filter
    if tags:
        trends_query = trends_query.join(Content.trend_tags).filter(
            TrendTag.name.in_(tags)
        )
    
    # Sortierung
    sort_by = request.args.get('sort_by', 'priority_score')
    sort_order = request.args.get('sort_order', 'desc')
    
    if hasattr(Content, sort_by):
        if sort_order == 'desc':
            trends_query = trends_query.order_by(getattr(Content, sort_by).desc())
        else:
            trends_query = trends_query.order_by(getattr(Content, sort_by).asc())
    
    # Paginierung
    page = request.args.get('page', 1, type=int)
    per_page = request.args.get('per_page', 20, type=int)
    
    trends = trends_query.paginate(
        page=page, per_page=per_page, error_out=False
    )
    
    return jsonify({
        'trends': [trend.to_dict() for trend in trends.items],
        'total': trends.total,
        'pages': trends.pages,
        'current_page': page,
        'per_page': per_page
    })

