# Generated by Django 2.2.7 on 2019-11-14 13:23

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('questiontinder', '0007_question_added'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='topic',
            name='frozen',
        ),
        migrations.AddField(
            model_name='topic',
            name='active',
            field=models.BooleanField(default=True),
        ),
    ]