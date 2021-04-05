
from flask import (render_template, url_for, flash,
                   current_app, redirect, request, abort, Blueprint)
from flask_login import current_user, login_required
from tabadol import db
from tabadol.models import Post, OfferType
from tabadol.posts.forms import PostForm

posts = Blueprint('posts', __name__)


@posts.route("/post/new", methods=['GET', 'POST'])
@login_required
def new_post():
    user = current_user.user_offers
    for item in user:
        user_id = item.id
    form = PostForm()
    # set values for choices on dropdown form field

    '''available_groups=db.session.query(Groups).filter(Groups.userID == currend_user.userID).all()
    #Now forming the list of tuples, so it's ok for SelectField
    groups_list=[(i.groupID, i.groupName) for i in available_groups]
    form=AddName()

    form.offer_type.choices = [(i.id, i.name)
                               for i in OfferType.query.all()]'''
    if form.validate_on_submit():
        post = Post(title=form.title.data,
                    content=form.content.data, author=current_user, #address=form.address.data,
                    #location=Post.point_representation(
                    #    form.lat.data, form.lng.data), user_id=user_id,
                    offer_type_id=form.offer_type.data)
        db.session.add(post)
        db.session.commit()
        flash('Your offer has been successfully added!', 'success')
        return redirect(url_for('main.home'))
    return render_template('create_post.html', title='New Offer', form=form,  user=user, map_key=current_app.config['GOOGLEMAPS_KEY'], legend='New Offer')


@ posts.route("/post/<int:post_id>")
def post(post_id):
    post = Post.query.get_or_404(post_id)
    return render_template('post.html', title=post.title, post=post)


@ posts.route("/post/<int:post_id>/update", methods=['GET', 'POST'])
@ login_required
def update_post(post_id):
    post = Post.query.get_or_404(post_id)
    if post.author != current_user:
        abort(403)
    form = PostForm()
    if form.validate_on_submit():
        post.title = form.title.data
        post.content = form.content.data
        post.street_address = form.street_address.data
        post.location = Post.point_representation(
            form.lat.data, form.lng.data),
        db.session.add(post.location)
        db.session.commit()
        flash('The offer has been updated!', 'success')
        return redirect(url_for('posts.post', post_id=post.id))
    elif request.method == 'GET':
        form.title.data = post.title
        form.content.data = post.content
        form.street_address.data = post.street_address
    return render_template('create_post.html', title='Update Post',
                           form=form, legend='Update Post', post=post)


@ posts.route("/post/<int:post_id>/delete", methods=['POST'])
@ login_required
def delete_post(post_id):
    post = Post.query.get_or_404(post_id)
    if post.author != current_user:
        abort(403)
    db.session.delete(post)
    db.session.commit()
    flash('Your offer has been deleted!', 'success')
    return redirect(url_for('main.home'))


# JSON API route
# here i can set a route to create an api url
# within the function i will create a dictionary using the db data and return this dictionary as json (jsonify)

@ posts.route('/api/get_offers')
def api_all():
   # here the lat, lng, and radius is called from the API url created in js file
    lat = float(request.args.get('lat'))
    radius = int(request.args.get('radius'))
 # explanation of request.args.get():
 # https://www.digitalocean.com/community/tutorials/processing-incoming-request-data-in-flask

    posts = Post.get_offers_within_radius(lat=lat, lng=lng, radius=radius)
    # posts = Post.query.all()
    output = []
    for item in posts:
        output.append(item.to_dict())
    return jsonify(output)
