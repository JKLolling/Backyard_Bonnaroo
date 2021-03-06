"""empty message

Revision ID: fcae2d28e9d9
Revises: 2dcdfdbd62b4
Create Date: 2021-04-02 14:46:11.793990

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'fcae2d28e9d9'
down_revision = '2dcdfdbd62b4'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_column('shows', 'location_lng')
    op.drop_column('shows', 'location_lat')
    op.add_column('shows', sa.Column('location_lat', sa.Float(), nullable=False))
    op.add_column('shows', sa.Column('location_lng', sa.Float(), nullable=False))
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_column('shows', 'location_lng')
    op.drop_column('shows', 'location_lat')
    # ### end Alembic commands ###
