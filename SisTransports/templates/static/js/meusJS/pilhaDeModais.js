class PilhaDeModais {
    constructor() {
      this.items = [];
    }
  
    // Adicionar um elemento ao topo da pilha
    push(element) {
      this.items.push(element);
    }
  
    // Remover o elemento do topo da pilha e retorná-lo
    pop() {
      if (this.isEmpty()) {
        return "Underflow";
      }
      return this.items.pop();
    }
  
    // Retorna o elemento no topo da pilha sem removê-lo
    peek() {
      return !this.isEmpty() ? this.items[this.items.length - 1] : "Não existem elementos na pilha";
    }
  
    // Retorna verdadeiro se a pilha estiver vazia, senão retorna falso
    isEmpty() {
      return this.items.length === 0;
    }
  
    // Retorna o tamanho da pilha
    size() {
      return this.items.length;
    }
  
    // Limpa a pilha
    clear() {
      this.items = [];
    }
  
    // Retorna a pilha como uma string
    toString() {
      return this.items.toString();
    }
  }
    // // Exemplo de uso:
    // var pilhaModais = new PilhaDeModais();

    // // Adiciona um event listener para o evento shown.bs.modal
    // $('.modal').on('shown.bs.modal', function () {
    //   // Aqui você pode adicionar o código que deseja executar quando o modal é aberto
    //   pilhaModais.push(this.id);
    //   console.log(pilhaModais.toString())
    // });

    // // Executa essa função quando o modal é fechado
    // $('.modal').on('hidden.bs.modal', function (e) {
    //   console.log(pilhaModais.size())
    //   if(pilhaModais.size()<=1){
    //     pilhaModais.clear()
    //     console.log(pilhaModais.toString())
    //   }else{
    //     pilha.pop()
    //     $('#'+pilha.peek()).show()
    //   }
    // });
  

  
  // console.log(stack.isEmpty()); // Saída: true
  
  // stack.push(10);
  // stack.push(20);
  // stack.push(30);
  
  // console.log(stack.toString()); // Saída: 10,20,30
  // console.log(stack.size()); // Saída: 3
  // console.log(stack.isEmpty()); // Saída: false
  
  // console.log(stack.peek()); // Saída: 30
  
  // console.log(stack.pop()); // Saída: 30
  // console.log(stack.toString()); // Saída: 10,20
  