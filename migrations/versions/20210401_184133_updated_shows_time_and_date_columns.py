"""updated shows time and date columns

Revision ID: 8e784b24ba07
Revises: b7a2d51806d9
Create Date: 2021-04-01 18:41:33.313072

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '8e784b24ba07'
down_revision = 'b7a2d51806d9'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_column('shows', 'scription')
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('shows', sa.Column('scription', sa.TEXT(), autoincrement=False, nullable=True))
    # ### end Alembic commands ###