from django.db import models

class Municipios(models.Model):
    municipio = models.IntegerField(blank=True, null=True)
    uf = models.IntegerField(blank=True, null=True)
    uf_code = models.TextField(blank=True, null=True)
    name = models.TextField(blank=True, null=True)
    mesoregion = models.IntegerField(blank=True, null=True)
    microregion = models.IntegerField(blank=True, null=True)
    rgint = models.IntegerField(blank=True, null=True)
    rgi = models.IntegerField(blank=True, null=True)
    osm_relation_id = models.IntegerField(blank=True, null=True)
    wikidata_id = models.TextField(blank=True, null=True)
    is_capital = models.TextField(blank=True, null=True)
    wikipedia_pt = models.TextField(blank=True, null=True)
    lon = models.FloatField(blank=True, null=True)
    lat = models.FloatField(blank=True, null=True)
    no_accents = models.TextField(blank=True, null=True)
    slug_name = models.TextField(blank=True, null=True)
    alternative_names = models.TextField(blank=True, null=True)
    pop_21 = models.IntegerField(blank=True, null=True)

    def to_dict(self):
        return {
            'id': self.id,
            'uf': self.uf_code,
            'municipio': self.name
        }

    class Meta:
        managed = False
        db_table = 'municipios'