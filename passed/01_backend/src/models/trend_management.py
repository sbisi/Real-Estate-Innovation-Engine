from flask_sqlalchemy import SQLAlchemy
from datetime import datetime
from src.models.user import db
from src.models.content import Content

class TrendPhase(db.Model):
    """Definiert die verschiedenen Phasen eines Trends"""
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), unique=True, nullable=False)
    description = db.Column(db.Text, nullable=True)
    order = db.Column(db.Integer, nullable=False)  # Reihenfolge der Phasen
    color = db.Column(db.String(7), nullable=True)  # Hex-Farbcode für UI
    
    # Relationships
    contents = db.relationship('Content', backref='trend_phase', lazy=True)
    trend_histories = db.relationship('TrendHistory', backref='phase', lazy=True)
    
    def __repr__(self):
        return f'<TrendPhase {self.name}>'
    
    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'description': self.description,
            'order': self.order,
            'color': self.color
        }

class TrendScore(db.Model):
    """Speichert verschiedene Bewertungen für Trends"""
    id = db.Column(db.Integer, primary_key=True)
    content_id = db.Column(db.Integer, db.ForeignKey('content.id'), nullable=False)
    score_type = db.Column(db.String(50), nullable=False)  # 'relevance', 'impact', 'urgency', 'feasibility', 'risk'
    value = db.Column(db.Float, nullable=False)  # 0.0 - 5.0
    calculated_at = db.Column(db.DateTime, default=datetime.utcnow)
    calculated_by = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=True)  # NULL für automatische Berechnung
    is_automatic = db.Column(db.Boolean, default=False)
    
    # Relationships
    content = db.relationship('Content', backref=db.backref('trend_scores', lazy=True, cascade='all, delete-orphan'))
    calculator = db.relationship('User', backref=db.backref('calculated_scores', lazy=True))
    
    def __repr__(self):
        return f'<TrendScore {self.score_type}:{self.value} for Content {self.content_id}>'
    
    def to_dict(self):
        return {
            'id': self.id,
            'content_id': self.content_id,
            'score_type': self.score_type,
            'value': self.value,
            'calculated_at': self.calculated_at.isoformat() if self.calculated_at else None,
            'calculated_by': self.calculated_by,
            'calculator_username': self.calculator.username if self.calculator else 'System',
            'is_automatic': self.is_automatic
        }

class TrendAlert(db.Model):
    """Definiert Alerts für Trend-Änderungen"""
    id = db.Column(db.Integer, primary_key=True)
    content_id = db.Column(db.Integer, db.ForeignKey('content.id'), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    alert_type = db.Column(db.String(50), nullable=False)  # 'score_change', 'phase_change', 'new_content'
    threshold = db.Column(db.Float, nullable=True)  # Schwellenwert für numerische Alerts
    is_active = db.Column(db.Boolean, default=True)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    last_triggered = db.Column(db.DateTime, nullable=True)
    
    # Relationships
    content = db.relationship('Content', backref=db.backref('trend_alerts', lazy=True, cascade='all, delete-orphan'))
    user = db.relationship('User', backref=db.backref('trend_alerts', lazy=True))
    
    def __repr__(self):
        return f'<TrendAlert {self.alert_type} for Content {self.content_id}>'
    
    def to_dict(self):
        return {
            'id': self.id,
            'content_id': self.content_id,
            'user_id': self.user_id,
            'username': self.user.username if self.user else None,
            'alert_type': self.alert_type,
            'threshold': self.threshold,
            'is_active': self.is_active,
            'created_at': self.created_at.isoformat() if self.created_at else None,
            'last_triggered': self.last_triggered.isoformat() if self.last_triggered else None
        }

class TrendCorrelation(db.Model):
    """Speichert Korrelationen zwischen verschiedenen Trends"""
    id = db.Column(db.Integer, primary_key=True)
    trend_a_id = db.Column(db.Integer, db.ForeignKey('content.id'), nullable=False)
    trend_b_id = db.Column(db.Integer, db.ForeignKey('content.id'), nullable=False)
    correlation_strength = db.Column(db.Float, nullable=False)  # -1.0 bis 1.0
    correlation_type = db.Column(db.String(50), nullable=True)  # 'positive', 'negative', 'causal'
    detected_at = db.Column(db.DateTime, default=datetime.utcnow)
    confidence_score = db.Column(db.Float, nullable=True)  # 0.0 bis 1.0
    
    # Relationships
    trend_a = db.relationship('Content', foreign_keys=[trend_a_id], backref=db.backref('correlations_as_a', lazy=True))
    trend_b = db.relationship('Content', foreign_keys=[trend_b_id], backref=db.backref('correlations_as_b', lazy=True))
    
    def __repr__(self):
        return f'<TrendCorrelation {self.trend_a_id}<->{self.trend_b_id}: {self.correlation_strength}>'
    
    def to_dict(self):
        return {
            'id': self.id,
            'trend_a_id': self.trend_a_id,
            'trend_b_id': self.trend_b_id,
            'trend_a_title': self.trend_a.title if self.trend_a else None,
            'trend_b_title': self.trend_b.title if self.trend_b else None,
            'correlation_strength': self.correlation_strength,
            'correlation_type': self.correlation_type,
            'detected_at': self.detected_at.isoformat() if self.detected_at else None,
            'confidence_score': self.confidence_score
        }

class TrendHistory(db.Model):
    """Verfolgt Änderungen in der Trend-Phase und anderen wichtigen Attributen"""
    id = db.Column(db.Integer, primary_key=True)
    content_id = db.Column(db.Integer, db.ForeignKey('content.id'), nullable=False)
    phase_id = db.Column(db.Integer, db.ForeignKey('trend_phase.id'), nullable=True)
    changed_at = db.Column(db.DateTime, default=datetime.utcnow)
    changed_by = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=True)
    change_type = db.Column(db.String(50), nullable=False)  # 'phase_change', 'score_update', 'status_change'
    old_value = db.Column(db.String(200), nullable=True)
    new_value = db.Column(db.String(200), nullable=True)
    notes = db.Column(db.Text, nullable=True)
    
    # Relationships
    content = db.relationship('Content', backref=db.backref('trend_history', lazy=True, cascade='all, delete-orphan'))
    changer = db.relationship('User', backref=db.backref('trend_changes', lazy=True))
    
    def __repr__(self):
        return f'<TrendHistory {self.change_type} for Content {self.content_id}>'
    
    def to_dict(self):
        return {
            'id': self.id,
            'content_id': self.content_id,
            'phase_id': self.phase_id,
            'phase_name': self.phase.name if self.phase else None,
            'changed_at': self.changed_at.isoformat() if self.changed_at else None,
            'changed_by': self.changed_by,
            'changer_username': self.changer.username if self.changer else 'System',
            'change_type': self.change_type,
            'old_value': self.old_value,
            'new_value': self.new_value,
            'notes': self.notes
        }

class TrendMetrics(db.Model):
    """Speichert aggregierte Metriken für Trends"""
    id = db.Column(db.Integer, primary_key=True)
    content_id = db.Column(db.Integer, db.ForeignKey('content.id'), nullable=False)
    metric_type = db.Column(db.String(50), nullable=False)  # 'engagement', 'mentions', 'sentiment'
    value = db.Column(db.Float, nullable=False)
    period_start = db.Column(db.DateTime, nullable=False)
    period_end = db.Column(db.DateTime, nullable=False)
    calculated_at = db.Column(db.DateTime, default=datetime.utcnow)
    
    # Relationships
    content = db.relationship('Content', backref=db.backref('trend_metrics', lazy=True, cascade='all, delete-orphan'))
    
    def __repr__(self):
        return f'<TrendMetrics {self.metric_type}:{self.value} for Content {self.content_id}>'
    
    def to_dict(self):
        return {
            'id': self.id,
            'content_id': self.content_id,
            'metric_type': self.metric_type,
            'value': self.value,
            'period_start': self.period_start.isoformat() if self.period_start else None,
            'period_end': self.period_end.isoformat() if self.period_end else None,
            'calculated_at': self.calculated_at.isoformat() if self.calculated_at else None
        }

class TrendTag(db.Model):
    """Tags für bessere Kategorisierung und Suche von Trends"""
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), unique=True, nullable=False)
    description = db.Column(db.Text, nullable=True)
    color = db.Column(db.String(7), nullable=True)  # Hex-Farbcode
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    
    def __repr__(self):
        return f'<TrendTag {self.name}>'
    
    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'description': self.description,
            'color': self.color,
            'created_at': self.created_at.isoformat() if self.created_at else None
        }

# Add relationship to Content model (this would be added to the Content class)
# trend_tags = db.relationship('TrendTag', secondary=content_trend_tags, lazy='subquery',
#                             backref=db.backref('contents', lazy=True))

