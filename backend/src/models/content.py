from flask_sqlalchemy import SQLAlchemy
from datetime import datetime
from .__init__ import db
from .associations import content_trend_tags

class Content(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(200), nullable=False)
    short_description = db.Column(db.Text, nullable=True)
    long_description = db.Column(db.Text, nullable=True)
    content_type = db.Column(db.String(50), nullable=False)  # 'trend', 'technology', 'inspiration'
    image_url = db.Column(db.String(500), nullable=True)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    created_by = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    industry = db.Column(db.String(100), nullable=True)
    time_horizon = db.Column(db.String(50), nullable=True)  # 'short', 'medium', 'long'
    status = db.Column(db.String(50), default='draft')  # 'draft', 'approved', 'rejected'
    
    # Trendmanagement-spezifische Attribute
    trend_phase_id = db.Column(db.Integer, db.ForeignKey('trend_phase.id'), nullable=True)
    priority_score = db.Column(db.Float, default=0.0)  # Berechneter Gesamtscore
    last_monitored_at = db.Column(db.DateTime, nullable=True)
    external_source_urls = db.Column(db.Text, nullable=True)  # JSON-Array von URLs
    sentiment_score = db.Column(db.Float, nullable=True)  # -1.0 bis 1.0
    confidence_level = db.Column(db.Float, default=0.5)  # 0.0 bis 1.0
    
    # Relationships
    creator = db.relationship('User', backref=db.backref('contents', lazy=True))
    ratings = db.relationship('Rating', backref='content', lazy=True, cascade='all, delete-orphan')
    comments = db.relationship('Comment', backref='content', lazy=True, cascade='all, delete-orphan')
    
    # Trendmanagement-Relationships (werden durch Import der trend_management.py verfügbar)
    trend_tags = db.relationship('TrendTag', secondary=content_trend_tags, lazy='subquery',
                                backref=db.backref('contents', lazy=True))
    
    def __repr__(self):
        return f'<Content {self.title}>'
    
    def to_dict(self):
        return {
            'id': self.id,
            'title': self.title,
            'short_description': self.short_description,
            'long_description': self.long_description,
            'content_type': self.content_type,
            'image_url': self.image_url,
            'created_at': self.created_at.isoformat() if self.created_at else None,
            'created_by': self.created_by,
            'creator_username': self.creator.username if self.creator else None,
            'industry': self.industry,
            'time_horizon': self.time_horizon,
            'status': self.status,
            'average_rating': self.get_average_rating(),
            'rating_count': len(self.ratings),
            'comment_count': len(self.comments),
            # Trendmanagement-spezifische Daten
            'trend_phase_id': self.trend_phase_id,
            'trend_phase_name': self.trend_phase.name if hasattr(self, 'trend_phase') and self.trend_phase else None,
            'priority_score': self.priority_score,
            'last_monitored_at': self.last_monitored_at.isoformat() if self.last_monitored_at else None,
            'sentiment_score': self.sentiment_score,
            'confidence_level': self.confidence_level,
            'trend_tags': [tag.to_dict() for tag in self.trend_tags] if hasattr(self, 'trend_tags') else [],
            'trend_scores': self.get_trend_scores_summary()
        }
    
    def get_average_rating(self):
        if not self.ratings:
            return 0
        return sum(rating.value for rating in self.ratings) / len(self.ratings)

class Rating(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    content_id = db.Column(db.Integer, db.ForeignKey('content.id'), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    value = db.Column(db.Integer, nullable=False)  # 1-5 rating
    criteria = db.Column(db.String(100), nullable=True)  # 'relevance', 'feasibility', 'impact', etc.
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    
    # Relationships
    user = db.relationship('User', backref=db.backref('ratings', lazy=True))
    
    def __repr__(self):
        return f'<Rating {self.value} for Content {self.content_id}>'
    
    def to_dict(self):
        return {
            'id': self.id,
            'content_id': self.content_id,
            'user_id': self.user_id,
            'username': self.user.username if self.user else None,
            'value': self.value,
            'criteria': self.criteria,
            'created_at': self.created_at.isoformat() if self.created_at else None
        }

class Comment(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    content_id = db.Column(db.Integer, db.ForeignKey('content.id'), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    text = db.Column(db.Text, nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    
    # Relationships
    user = db.relationship('User', backref=db.backref('comments', lazy=True))
    
    def __repr__(self):
        return f'<Comment by {self.user.username if self.user else "Unknown"} on Content {self.content_id}>'
    
    def to_dict(self):
        return {
            'id': self.id,
            'content_id': self.content_id,
            'user_id': self.user_id,
            'username': self.user.username if self.user else None,
            'text': self.text,
            'created_at': self.created_at.isoformat() if self.created_at else None
        }

class OpportunitySpace(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(200), nullable=False)
    description = db.Column(db.Text, nullable=True)
    created_by = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    
    # Relationships
    creator = db.relationship('User', backref=db.backref('opportunity_spaces', lazy=True))
    
    def __repr__(self):
        return f'<OpportunitySpace {self.title}>'
    
    def to_dict(self):
        return {
            'id': self.id,
            'title': self.title,
            'description': self.description,
            'created_by': self.created_by,
            'creator_username': self.creator.username if self.creator else None,
            'created_at': self.created_at.isoformat() if self.created_at else None
        }


    def get_trend_scores_summary(self):
        """Gibt eine Zusammenfassung der Trend-Scores zurück"""
        if not hasattr(self, 'trend_scores'):
            return {}
        
        scores = {}
        for score in self.trend_scores:
            scores[score.score_type] = {
                'value': score.value,
                'calculated_at': score.calculated_at.isoformat() if score.calculated_at else None,
                'is_automatic': score.is_automatic
            }
        return scores
    
    def calculate_priority_score(self):
        """Berechnet den Prioritäts-Score basierend auf verschiedenen Faktoren"""
        if not hasattr(self, 'trend_scores'):
            return 0.0
        
        # Gewichtungen für verschiedene Score-Typen
        weights = {
            'relevance': 0.25,
            'impact': 0.30,
            'urgency': 0.20,
            'feasibility': 0.15,
            'risk': 0.10
        }
        
        total_score = 0.0
        total_weight = 0.0
        
        for score in self.trend_scores:
            if score.score_type in weights:
                weight = weights[score.score_type]
                total_score += score.value * weight
                total_weight += weight
        
        # Normalisierung auf 0-5 Skala
        if total_weight > 0:
            return total_score / total_weight
        return 0.0
    
    def update_priority_score(self):
        """Aktualisiert den Prioritäts-Score und speichert ihn"""
        self.priority_score = self.calculate_priority_score()
        return self.priority_score



from src.models.associations import content_trend_tags

