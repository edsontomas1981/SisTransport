class QuadTree {
    constructor(bounds, capacity) {
        this.bounds = bounds; // Limites do quadrante (área retangular)
        this.capacity = capacity; // Capacidade máxima de pontos por quadrante
        this.points = []; // Pontos armazenados neste quadrante
        this.children = []; // Quatro subquadrantes (NW, NE, SW, SE)
    }

    insert(point) {
        if (!this.bounds.contains(point)) {
            return false; // O ponto está fora dos limites deste quadrante
        }

        if (this.points.length < this.capacity) {
            this.points.push(point);
            return true;
        }

        // Se atingiu a capacidade máxima, dividir este quadrante em subquadrantes
        if (!this.children.length) {
            this.subdivide();
        }

        // Tentar inserir o ponto em um dos subquadrantes
        for (let child of this.children) {
            if (child.insert(point)) {
                return true;
            }
        }

        return false;
    }

    subdivide() {
        const { x, y, width, height } = this.bounds;
        const halfWidth = width / 2;
        const halfHeight = height / 2;

        // Criar os quatro subquadrantes
        this.children.push(new QuadTree(new Rectangle(x, y, halfWidth, halfHeight), this.capacity)); // NW
        this.children.push(new QuadTree(new Rectangle(x + halfWidth, y, halfWidth, halfHeight), this.capacity)); // NE
        this.children.push(new QuadTree(new Rectangle(x, y + halfHeight, halfWidth, halfHeight), this.capacity)); // SW
        this.children.push(new QuadTree(new Rectangle(x + halfWidth, y + halfHeight, halfWidth, halfHeight), this.capacity)); // SE

        // Reinsere os pontos existentes nos novos subquadrantes
        for (let point of this.points) {
            for (let child of this.children) {
                if (child.insert(point)) {
                    break;
                }
            }
        }

        this.points = []; // Limpa os pontos deste quadrante após a subdivisão
    }

    queryRange(range) {
        let foundPoints = [];

        // Verificar se a área de consulta (range) se intersecta com os limites deste quadrante
        if (!this.bounds.intersects(range)) {
            return foundPoints;
        }

        // Verificar os pontos dentro do próprio quadrante
        for (let point of this.points) {
            if (range.contains(point)) {
                foundPoints.push(point);
            }
        }

        // Verificar os subquadrantes recursivamente
        for (let child of this.children) {
            foundPoints = foundPoints.concat(child.queryRange(range));
        }

        return foundPoints;
    }
}

// Classe para representar uma área retangular delimitada por coordenadas geográficas (latitude e longitude)
class Rectangle {
    constructor(minLat, minLng, maxLat, maxLng) {
        this.minLat = minLat;
        this.minLng = minLng;
        this.maxLat = maxLat;
        this.maxLng = maxLng;
    }

    contains(point) {
        return (
            point.lat >= this.minLat &&
            point.lat <= this.maxLat &&
            point.lng >= this.minLng &&
            point.lng <= this.maxLng
        );
    }

    intersects(range) {
        return !(
            range.maxLng < this.minLng ||
            range.minLng > this.maxLng ||
            range.maxLat < this.minLat ||
            range.minLat > this.maxLat
        );
    }
}
