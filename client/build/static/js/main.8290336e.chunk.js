(this.webpackJsonpfun=this.webpackJsonpfun||[]).push([[0],{15:function(e,t,r){},9:function(e,t,r){"use strict";r.r(t);var s=r(8),n=r(3),a=r(4),i=r(6),c=r(5),o=r(0),u=r(1),l=r.n(u),h=r(7),d=r.n(h);r(15);function j(e){return Object(o.jsx)("button",{className:"square",onClick:e.onClick,children:e.value})}var b=function(e){Object(i.a)(r,e);var t=Object(c.a)(r);function r(){return Object(n.a)(this,r),t.apply(this,arguments)}return Object(a.a)(r,[{key:"renderSquare",value:function(e){var t=this;return Object(o.jsx)(j,{value:this.props.squares[e],onClick:function(){return t.props.onClick(e)}})}},{key:"render",value:function(){return Object(o.jsxs)("div",{children:[Object(o.jsxs)("div",{className:"board-row",children:[this.renderSquare(0),this.renderSquare(1),this.renderSquare(2)]}),Object(o.jsxs)("div",{className:"board-row",children:[this.renderSquare(3),this.renderSquare(4),this.renderSquare(5)]}),Object(o.jsxs)("div",{className:"board-row",children:[this.renderSquare(6),this.renderSquare(7),this.renderSquare(8)]})]})}}]),r}(l.a.PureComponent),v=function(e){Object(i.a)(r,e);var t=Object(c.a)(r);function r(e){var s;return Object(n.a)(this,r),(s=t.call(this,e)).state={history:[{squares:Array(9).fill(null)}],stepNumber:0,xIsNext:!0,date:"",time:"",text:""},s}return Object(a.a)(r,[{key:"handleClick",value:function(e){var t=this.state.history.slice(0,this.state.stepNumber+1),r=t[t.length-1].squares.slice();x(r)||r[e]||(r[e]=this.state.xIsNext?"X":"O",this.setState({history:t.concat([{squares:r}]),stepNumber:t.length,xIsNext:!this.state.xIsNext}))}},{key:"jumpTo",value:function(e){this.setState({stepNumber:e,xIsNext:e%2===0})}},{key:"componentDidMount",value:function(){var e=this;fetch("http://192.168.1.9:3000/test").then((function(e){return e.json()})).then((function(t){console.log("This is your data",t),e.setState({date:t.Date,time:t.Time,text:t.Text})})).catch((function(e){console.error("Error:",e)}))}},{key:"render",value:function(){var e,t=this,r=this.state.history,s=r[this.state.stepNumber],n=x(s.squares),a=r.map((function(e,s){var n;if(s>0){var a=r[s-1],i=function(e,t){for(var r=0;r<e.length;r++){if(e[r]!==t[r])return{row:Math.floor(r/3),col:r%3}}throw new Error("Not possible")}(e.squares,a.squares),c=i.row,u=i.col;n="Go to move #"+s+" ("+c+", "+u+")"}else n="Go to game start";var l=s===t.state.stepNumber?"bold":"normal";return Object(o.jsx)("li",{children:Object(o.jsx)("button",{onClick:function(){return t.jumpTo(s)},style:{fontWeight:l},children:n})},s)}));return e=n?"Winner: "+n:9===this.state.stepNumber?"Game ends in a draw.":"Next player: "+(this.state.xIsNext?"X":"O"),Object(o.jsxs)("div",{className:"game",children:[Object(o.jsx)("div",{className:"game-board",children:Object(o.jsx)(b,{squares:s.squares,onClick:function(e){return t.handleClick(e)}})}),Object(o.jsxs)("div",{className:"game-info",children:[Object(o.jsx)("div",{children:this.state.date}),Object(o.jsx)("div",{children:this.state.time}),Object(o.jsx)("div",{children:this.state.text}),Object(o.jsx)("div",{children:e}),Object(o.jsx)("ol",{children:a})]})]})}}]),r}(l.a.Component);function x(e){for(var t=[[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]],r=0;r<t.length;r++){var n=Object(s.a)(t[r],3),a=n[0],i=n[1],c=n[2];if(e[a]&&e[a]===e[i]&&e[a]===e[c])return e[a]}return null}d.a.render(Object(o.jsx)(v,{}),document.getElementById("root"))}},[[9,1,2]]]);
//# sourceMappingURL=main.8290336e.chunk.js.map