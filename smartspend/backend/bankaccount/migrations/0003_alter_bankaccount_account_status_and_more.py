# Generated by Django 5.0.4 on 2024-05-05 18:31

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('bankaccount', '0002_alter_bankaccount_table_comment_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='bankaccount',
            name='account_status',
            field=models.CharField(choices=[('OPEN', 'open'), ('CLOSED', 'closed'), ('FROZEN', 'frozen')], default='open', max_length=50),
        ),
        migrations.AlterField(
            model_name='bankaccount',
            name='date_closed',
            field=models.DateField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='bankaccount',
            name='date_opened',
            field=models.DateField(),
        ),
        migrations.AlterField(
            model_name='bankaccount',
            name='type',
            field=models.CharField(choices=[('CHEQUE', 'cheque'), ('SAVINGS', 'savings')], default='cheque', max_length=100),
        ),
    ]
