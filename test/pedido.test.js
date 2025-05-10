const assert = require('assert');
const Pedido = require('../Pedido');

describe('Classe Pedido', function () {
  let pedido;

  beforeEach(function () {
    pedido = new Pedido();
  });

  describe('adicionarItem()', function () {
    it('deve adicionar item válido corretamente', function () {
      pedido.adicionarItem("Hamburguer", 20, 2);
      assert.strictEqual(pedido.itens.length, 1);
      assert.deepStrictEqual(pedido.itens[0], { nome: "Hamburguer", preco: 20, quantidade: 2 });
    });

    it('deve lançar erro ao adicionar item com dados inválidos', function () {
      assert.throws(() => {
        pedido.adicionarItem("", 10, 1);
      }, /Dados inválidos/);

      assert.throws(() => {
        pedido.adicionarItem("Refri", 0, 1);
      }, /Dados inválidos/);

      assert.throws(() => {
        pedido.adicionarItem("Refri", 5, 0);
      }, /Dados inválidos/);
    });
  });

  describe('aplicarDesconto()', function () {
    it('deve aplicar desconto válido PROMO10', function () {
      pedido.aplicarDesconto("PROMO10");
      assert.strictEqual(pedido.desconto, 10);
    });

    it('deve lançar erro ao aplicar código inválido', function () {
      assert.throws(() => {
        pedido.aplicarDesconto("INVALIDO");
      }, /Código de promoção inválido/);
    });
  });

  describe('calcularTotalPedido()', function () {
    it('deve calcular o total corretamente com desconto PROMO10', function () {
      pedido.adicionarItem("Combo", 50, 1); // subtotal: 50
      pedido.aplicarDesconto("PROMO10");    // 10% de desconto => 45
      const total = pedido.calcularTotalPedido(); // 45 * 5 = 225
      assert.strictEqual(total, 50);
    });

    it('deve calcular o total corretamente sem desconto', function () {
      pedido.adicionarItem("X-Burguer", 30, 1); // subtotal: 30
      const total = pedido.calcularTotalPedido(); // 30 * 5 = 150
      assert.strictEqual(total, 35);
    });
  });

  describe('confirmarPedido()', function () {
    it('deve confirmar pedido com itens', function () {
      pedido.adicionarItem("X-Burguer", 25, 1);
      pedido.confirmarPedido();
      assert.strictEqual(pedido.status, "Confirmado");
    });

    it('deve lançar erro ao confirmar pedido vazio', function () {
      assert.throws(() => {
        pedido.confirmarPedido();
      }, /carrinho vazio/);
    });
  });

  describe('cancelarPedido()', function () {
    it('deve cancelar pedido com itens', function () {
      pedido.adicionarItem("X-Burguer", 25, 1);
      pedido.cancelarPedido();
      assert.strictEqual(pedido.status, "Cancelado");
    });

    it('deve lançar erro ao cancelar pedido vazio', function () {
      assert.throws(() => {
        pedido.cancelarPedido();
      }, /carrinho vazio/);
    });
  });
});
