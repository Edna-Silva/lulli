# Generated by Django 5.0.4 on 2024-05-12 12:28

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('authentication', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='user',
            name='is_onboarded',
            field=models.BooleanField(default=False),
        ),
    ]
