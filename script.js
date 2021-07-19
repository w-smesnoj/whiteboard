window.addEventListener('DOMContentLoaded', () => {
  let board1 = new board('#board');

  let boardInfo =
    JSON.parse(localStorage.getItem('localBoard')) || prebuildBoard;

  board1.initial(boardInfo);

  console.log(board1);
  qs('#btn-save').addEventListener('click', (e) => {
    board1.saveToLocal();
  });
  qs('#btn-delete').addEventListener('click', (e) => {
    let lines = board1.components.lines;
    lines[0].delete();
    lines.splice(0, 1);
  });
});

function board(rootElement) {
  this.rootElement = qs(rootElement);
  this.components = {
    elements: [],
    lines: [],
  };
  let board = this;
  let svg = qs('#svg');

  this.initial = function (board) {
    board.elements.forEach((config) => {
      this.components.elements.push(new element(config));
    });
    board.lines.forEach((config) => {
      this.components.lines.push(new line(config));
    });
  };

  this.saveToLocal = function () {
    let newBoard = {
      elements: [],
      lines: [],
    };

    this.components.elements.forEach((elm) => {
      newBoard.elements.push(elm.getStateSave());
    });
    this.components.lines.forEach((line) => {
      newBoard.lines.push(line.getStateSave());
    });
    console.log(newBoard);

    localStorage.setItem('localBoard', JSON.stringify(newBoard));
    console.log('saved');
  };

  // console.log(this.rootElement);
  svg.addEventListener('dblclick', (e) => {
    if (e.target !== svg) return;

    var rect = svg.getBoundingClientRect();
    var x = e.clientX - rect.left;
    var y = e.clientY - rect.top;

    this.components.elements.push(
      new element({
        position: {
          x: x,
          y: y,
        },
      })
    );
  });

  function element(config) {
    let element = this;
    Object.assign(
      this,
      {
        id: uuidv4(),
        category: {
          type: 'shape',
          shape: 'rectangle',
        },
        content: {
          type: 'text',
          text: 'Rectangle',
        },
        position: {
          x: 0,
          y: 0,
        },
        dimension: {
          width: 100,
          height: 50,
        },
        style: {
          class: 'main hover-fill',
        },
        refs: [],
      },
      config
    );

    this.getStateSave = function () {
      return {
        id: this.id,
        category: this.category,
        content: this.content,
        position: this.position,
        dimension: this.dimension,
        style: this.style,
      };
    };

    createNode = () => {
      let node = document.createElement('div');
      board.rootElement.appendChild(node);
      node.setAttribute('id', this.id);
      node.setAttribute('class', this.style.class);
      node.innerHTML = `<span>${this.content.text}</span>`;

      this.updateView = () => {
        node.style.transform = `translateY(${this.position.y}px) translateX(${this.position.x}px)`;
      };
      this.updateView();

      interact(node).draggable({
        inertia: true,
        modifiers: [
          interact.modifiers.snap({
            targets: [interact.snappers.grid({ x: 25, y: 25 })],
            range: Infinity,
            relativePoints: [{ x: 0, y: 0 }],
            offset: 'parent',
          }),
          interact.modifiers.restrictRect({
            restriction: 'parent',
            endOnly: true,
          }),
        ],
        listeners: {
          move: (event) => {
            this.position.x += event.dx;
            this.position.y += event.dy;
            this.updateView();
            // event.target.style.transform = `translate(${position.x}px, ${position.y}px)`;
            this.refs.forEach((line) => line.updateView());
          },
        },
      });

      // dragElement(node, (delta) => {
      //   this.updatePosition(
      //     this.position.x + delta.y,
      //     this.position.y + delta.x
      //   );
      //   this.updateView();
      //   this.refs.forEach((x) => x.updateView());
      // });

      this.node = node;
    };
    createNode();

    // this.updatePosition = (x, y) => {
    //   this.position = {
    //     x: x,
    //     y: y,
    //   };
    // };
  }

  function line(config) {
    Object.assign(
      this,
      {
        id: uuidv4(),
        category: {
          type: 'line',
          points: 'elements',
        },
        between: {
          A: {
            elementId: '',
          },
          B: {
            elementId: '',
          },
        },
        style: {
          class: 'line',
        },
      },
      config
    );

    let A = this.between.A;
    let B = this.between.B;

    this.delete = () => {
      const index = A.element.refs.indexOf(this);
      if (index > -1) {
        A.element.refs.splice(index, 1);
      }
      const index2 = B.element.refs.indexOf(this);
      if (index2 > -1) {
        B.element.refs.splice(index2, 1);
      }
      this.node.remove();
      // console.log(board);
    };

    this.getStateSave = function () {
      return {
        id: this.id,
        category: this.category,
        between: {
          A: {
            elementId: A.elementId,
          },
          B: {
            elementId: B.elementId,
          },
        },
        style: this.style,
      };
    };

    A.element = board.components.elements.find((el) => el.id === A.elementId);
    B.element = board.components.elements.find((el) => el.id === B.elementId);

    A.element.refs.push(this);
    B.element.refs.push(this);
    console.log(this);

    createNode = () => {
      let rootElement = qs('#svg');
      let node = document.createElementNS('http://www.w3.org/2000/svg', 'path');
      rootElement.appendChild(node);
      node.setAttribute('id', this.id);
      node.setAttribute('class', this.style.class);
      this.node = node;
    };
    createNode();

    this.updateView = () => {
      let A = this.between.A;
      let B = this.between.B;
      let isHorizontal = false;

      determineOrientation(
        offsetPoints(A, 'center'),
        offsetPoints(B, 'center'),
        {
          left: () => {
            isHorizontal = true;
            A.at = 'right';
            B.at = 'left';
          },
          right: () => {
            A.at = 'left';
            B.at = 'right';
            isHorizontal = true;
          },
          top: () => {
            A.at = 'bottom';
            B.at = 'top';
          },
          bottom: () => {
            A.at = 'top';
            B.at = 'bottom';
          },
        }
      );

      let a = offsetPoints(A, A.at);
      let b = offsetPoints(B, B.at);

      let start = `${a.x} ${a.y}`;
      let end = `${b.x} ${b.y}`;

      let horizontal = `C ${(b.x + a.x) / 2} ${a.y} ${(b.x + a.x) / 2} ${b.y}`;
      let vertical = `C ${a.x} ${(b.y + a.y) / 2} ${b.x} ${(a.y + b.y) / 2}`;
      let bezier = isHorizontal ? horizontal : vertical;

      this.node.setAttribute('d', `M ${start} ${bezier}, ${end}`);
    };
    this.updateView();
  }
}
