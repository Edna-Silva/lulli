# Generated by Django 5.0.4 on 2024-05-05 18:31

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('expense', '0002_alter_expense_table_comment_alter_expense_table'),
        ('income', '0002_alter_income_table_comment_alter_income_table'),
        ('plannedpayments', '0002_alter_plannedpayment_table_comment_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='plannedpayment',
            name='expense',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='expense.expense'),
        ),
        migrations.AlterField(
            model_name='plannedpayment',
            name='income',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='income.income'),
        ),
        migrations.AlterField(
            model_name='plannedpayment',
            name='repeat_schedule',
            field=models.CharField(choices=[('MONTHLY', 'monthly'), ('WEEKLY', 'weekly'), ('DAILY', 'daily')], max_length=25),
        ),
        migrations.AlterField(
            model_name='plannedpayment',
            name='transaction_type',
            field=models.CharField(choices=[('INCOME', 'income'), ('EXPENSE', 'expense')], max_length=25),
        ),
    ]
