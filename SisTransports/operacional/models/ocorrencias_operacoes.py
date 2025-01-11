from django.db import models

class CategoriaOcorrencia(models.Model):
    """
    Representa uma categoria de ocorrência, como Operações Realizadas, 
    Não Realizadas, Não Realizadas em Rotas ou Outras Ocorrências.
    """
    nome = models.CharField(max_length=100, unique=True)

    class Meta:
        verbose_name = "Categoria de Ocorrência"
        verbose_name_plural = "Categorias de Ocorrências"

    def __str__(self):
        return self.nome
    
    def to_dict(self):
        return {
            "id":self.id,
            "nome":self.nome
        }

class TipoOcorrencia(models.Model):
    """
    Representa os tipos de ocorrências dentro de cada categoria.
    """
    codigo = models.CharField(max_length=10, unique=True)
    descricao = models.CharField(max_length=255)
    categoria = models.ForeignKey(
        CategoriaOcorrencia, 
        on_delete=models.CASCADE, 
        related_name="tipos_ocorrencias"
    )
    finalizadora = models.BooleanField(
        default=False,
        help_text="Indica se a ocorrência finaliza o processo do Cte ou da Coleta."
    )

    class Meta:
        verbose_name = "Tipo de Ocorrência"
        verbose_name_plural = "Tipos de Ocorrências"
        ordering = ["categoria", "codigo"]

    def __str__(self):
        return f"{self.id} - {self.codigo} - {self.descricao}"

    def to_dict(self):
        return {
            "id": self.id,
            "codigo": self.codigo,
            "descricao": self.descricao,
            "categoria": self.categoria.to_dict(),
            "finalizadora": self.finalizadora,
        }
