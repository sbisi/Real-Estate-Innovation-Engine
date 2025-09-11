import os
import sys
# DON'T CHANGE THIS !!!
sys.path.insert(0, os.path.dirname(__file__))

from src.main import app, db
from src.models.content import Content
from src.models.user import User
from src.models.trend_management import TrendPhase, TrendScore, TrendTag
from datetime import datetime

def seed_data():
    with app.app_context():
        # Clear existing data
        db.drop_all()
        db.create_all()

        # Create Trend Phases
        phases = [
            TrendPhase(name='Emerging', description='Neue, schwache Signale', order=1, color='#EF4444'),
            TrendPhase(name='Growing', description='Wachsende Trends mit zunehmender Evidenz', order=2, color='#F59E0B'),
            TrendPhase(name='Mainstream', description='Etablierte Trends mit breiter Adoption', order=3, color='#10B981'),
            TrendPhase(name='Declining', description='Abnehmende Relevanz', order=4, color='#6B7280'),
            TrendPhase(name='Legacy', description='Historische Trends für Referenz', order=5, color='#374151')
        ]
        db.session.bulk_save_objects(phases)
        db.session.commit()

        # Create Trend Tags
        tags = [
            TrendTag(name='Technology', color='#3B82F6'),
            TrendTag(name='Sustainability', color='#10B981'),
            TrendTag(name='Market', color='#F59E0B'),
            TrendTag(name='Social', color='#8B5CF6'),
        ]
        db.session.bulk_save_objects(tags)
        db.session.commit()

        # Create a default user
        user = User(username='admin', email='admin@example.com')
        db.session.add(user)
        db.session.commit()

        # Create Content (Trends)
        trends = [
            Content(title='Smart Building IoT Integration', short_description='Internet of Things sensors and devices for intelligent building management and energy optimization.', content_type='trend', trend_phase_id=2, priority_score=4.8, created_by=user.id),
            Content(title='Sustainable Urban Development', short_description='Growing trend towards eco-friendly and sustainable urban planning and development practices.', content_type='trend', trend_phase_id=3, priority_score=4.6, created_by=user.id),
            Content(title='Virtual Property Tours Platform', short_description='Innovative VR/AR platform enabling immersive virtual property viewings and remote inspections.', content_type='trend', trend_phase_id=2, priority_score=4.4, created_by=user.id),
            Content(title='Blockchain Property Transactions', short_description='Using blockchain for secure and transparent real estate transactions.', content_type='trend', trend_phase_id=1, priority_score=4.2, created_by=user.id),
            Content(title='Co-living and Flexible Spaces', short_description='Rise of co-living spaces and flexible rental models.', content_type='trend', trend_phase_id=3, priority_score=4.0, created_by=user.id),
        ]
        db.session.bulk_save_objects(trends)
        db.session.commit()

        # Add tags to trends
        trends[0].trend_tags.append(tags[0])
        trends[1].trend_tags.append(tags[1])
        trends[2].trend_tags.append(tags[0])
        trends[3].trend_tags.append(tags[0])
        trends[4].trend_tags.append(tags[3])
        db.session.commit()

        print('Database seeded successfully!')

if __name__ == '__main__':
    seed_data()


