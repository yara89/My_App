from flask_wtf import FlaskForm
from wtforms import StringField, SubmitField, TextAreaField, SelectField, HiddenField
from wtforms.validators import DataRequired, InputRequired


class PostForm(FlaskForm):
    title = StringField('Title', validators=[DataRequired()])
    content = TextAreaField('Content', validators=[DataRequired()])
#    lng = HiddenField('lng', validators=[DataRequired()])
#    lat = HiddenField('lat', validators=[DataRequired()])
#    address = HiddenField('current address', validators=[DataRequired()])
    offer_type = SelectField(u'Type of Offer', choices=[
                             (1, "give"), (2, "need")])
# choices=[(1, "give", 2, "need")], coerce=int, validators=[InputRequired()]
    submit = SubmitField('Post')
