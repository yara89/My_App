from tabaodol import db, bcrypt
from tabadol.models import User, UserTypes, OfferType, Post
from tabadol import create_app

app = create_app()
app.app_context().push()

# db.drop_all(app=app)

#db.engine.execute("SELECT InitSpatialMetaData();")

# db.create_all(app=app)

# insert myself as admin user
hashed_password = bcrypt.generate_password_hash('password').decode('utf-8')
admin = User(username='YarZ', email='YARA3001@gmail.com',
             password=hashed_password, user_type=UserTypes.Admin)
db.session.add(admin)

# insert OFFER types
give = OfferType(number=1, name='give')
need = OfferType(number=2, name='need')

db.session.add(give)
db.session.add(need)


db.session.commit()
