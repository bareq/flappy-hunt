<div class="celownik-blok" data-bind="style: {left: pos_x()+'px', top: pos_y()+'px'}, attr: {id: id}">
	<img class="celownik" data-bind="attr: {src: 'img/'+img}" />
	<button data-bind="click: function(){fly(50,50)}">Lec</button>
	<button data-bind="click: function(){destroy()}">Zniszcz</button>
</div>