from src.models.__init__ import db

# Association table for many-to-many relationship between Content and TrendTag
content_trend_tags = db.Table(
    'content_trend_tags',
    db.Column('content_id', db.Integer, db.ForeignKey('content.id'), primary_key=True),
    db.Column('trend_tag_id', db.Integer, db.ForeignKey('trend_tag.id'), primary_key=True)
)


