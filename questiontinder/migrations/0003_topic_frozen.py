# Generated by Django 2.2.7 on 2019-11-12 22:22

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('questiontinder', '0002_auto_20191112_2312'),
    ]

    operations = [
        migrations.AddField(
            model_name='topic',
            name='frozen',
            field=models.BooleanField(default=False),
        ),
    ]
