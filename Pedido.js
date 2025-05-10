class Pedido {
    constructor() {
        this.itens = [];
        this.status = "Pendente";
        this.taxaEntrega = 5.0;
        this.desconto = 0;
    }

    adicionarItem(nome, preco, quantidade) {
        if (!nome || preco <= 0 || quantidade <= 0) {
          throw new Error("Dados inválidos para o item.");
        }
    
        this.itens.push({ nome, preco, quantidade });
      }

    aplicarDesconto(codPromo) {
        const codValidos = {
            PROMO10: 10,
            PROMO20: 20
        };

        if (!codValidos[codPromo]) {
            throw new Error("Código de promoção inválido");
        }

        this.desconto = codValidos[codPromo];
    }

    calcularTotalPedido() {
        const subtotal = this.itens.reduce((total, item) => {
            return total + item.preco * item.quantidade;
        }, 0);

        const valorComDesconto = subtotal * (1 - this.desconto / 100);
        return valorComDesconto + this.taxaEntrega;
    }

    confirmarPedido() {
        if (this.itens.length === 0) {
            throw new Error("Não é possível confirmar pedido, carrinho vazio.");
        }

        this.status = "Confirmado";
    }

    cancelarPedido() {
        if (this.itens.length === 0) {
            throw new Error("Não é possível cancelar pedido, carrinho vazio.");
        }

        this.status = "Cancelado";
    }
}

module.exports = Pedido;
