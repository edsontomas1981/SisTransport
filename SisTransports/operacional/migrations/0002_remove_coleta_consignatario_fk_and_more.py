# Generated by Django 4.0.6 on 2022-09-05 15:49

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('parceiros', '0001_initial'),
        ('operacional', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='coleta',
            name='consignatario_fk',
        ),
        migrations.RemoveField(
            model_name='coleta',
            name='destinatario_fk',
        ),
        migrations.RemoveField(
            model_name='coleta',
            name='endereco_fk',
        ),
        migrations.RemoveField(
            model_name='coleta',
            name='redespacho_fk',
        ),
        migrations.RemoveField(
            model_name='coleta',
            name='remetente_fk',
        ),
        migrations.AddField(
            model_name='coleta',
            name='bairro',
            field=models.CharField(max_length=30, null=True),
        ),
        migrations.AddField(
            model_name='coleta',
            name='cep',
            field=models.CharField(max_length=9, null=True),
        ),
        migrations.AddField(
            model_name='coleta',
            name='cidade',
            field=models.CharField(max_length=50, null=True),
        ),
        migrations.AddField(
            model_name='coleta',
            name='complemento',
            field=models.CharField(max_length=30, null=True),
        ),
        migrations.AddField(
            model_name='coleta',
            name='numero',
            field=models.CharField(max_length=10, null=True),
        ),
        migrations.AddField(
            model_name='coleta',
            name='rua',
            field=models.CharField(max_length=70, null=True),
        ),
        migrations.AddField(
            model_name='coleta',
            name='uf',
            field=models.CharField(max_length=2, null=True),
        ),
        migrations.CreateModel(
            name='Dtc',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('consignatario_fk', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='consigDtc', to='parceiros.parceiros')),
                ('destinatario_fk', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='destDtc', to='parceiros.parceiros')),
                ('redespacho_fk', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='redespDtc', to='parceiros.parceiros')),
                ('remetente_fk', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='remetDtc', to='parceiros.parceiros')),
            ],
        ),
        migrations.AddField(
            model_name='coleta',
            name='dtc_fk',
            field=models.ForeignKey(default=1, on_delete=django.db.models.deletion.CASCADE, related_name='dtc', to='operacional.dtc'),
        ),
    ]