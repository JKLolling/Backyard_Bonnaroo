"""empty message

Revision ID: 5314e77c0974
Revises: fa9df2d00ebc
Create Date: 2021-04-20 12:47:04.402726

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '5314e77c0974'
down_revision = 'fa9df2d00ebc'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('reviews',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('comment', sa.Text(), nullable=True),
    sa.Column('rating', sa.Float(), nullable=True),
    sa.Column('artist_id', sa.Integer(), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.Column('created_on', sa.DateTime(), nullable=True),
    sa.ForeignKeyConstraint(['artist_id'], ['artists.id'], ),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('reviews')
    # ### end Alembic commands ###
