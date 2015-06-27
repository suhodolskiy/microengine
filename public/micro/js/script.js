(function($){
	var $appLoad = window.safari || window.chrome ? $('body'): $('html');

	$appLoad.ready(function(){
		// hide loading/preloader
		var $appLoading = $('.app-loading');

		$appLoading.fadeOut(400, function(){console.log('App Ready!')});

		// disabled

		$('.disabled').click(function(event) {
			event.preventDefault();
		});	

		// dataTables
		var $table = $('table.app-table'), $dataTable,
			CheckBoxTable = new Checkbox('table');

		// Sale page
		var $salePicker = $('.sale-datepicker input').val(moment().format('dddd D MMM YYYY'));

		saleDatePicker = new Pikaday({ 
			field: $salePicker[0],
			format: 'dddd D MMM YYYY' ,
			firstDay: 1,
			onSelect: function(date){
				dataTablesReload();
			}
		});

		// Base
		var baseDatePicker = $('.datepicker');

		new Pikaday({ 
			field: baseDatePicker[0],
			format: 'YYYY-MM-DD' ,
			firstDay: 1,
			onSelect: function(date) {
				baseDatePicker.attr('value',this.getMoment()._d);
    		}
		}).setDate(moment()._d);
	
		switch($table.attr('table-name')){
			case 'users':
					$dataTable = $table.DataTable({
						"sAjaxSource": "/micro/users/data",
						"dataSrc": "data",
						"responsive": true,
						"aoColumns": [
							{
								"mDataProp": "_id", 
								"sDefaultContent": "n/a",
								"mRender": function ( data, type, full) {
									return '<i class="fa fa-plus-circle"></i>'; 
								},
								"sClass": "td-trigger", 
								"width": "60px"
							},
							{
								"mDataProp": "name", 
								"sDefaultContent": "n/a"
							},
							{
								"mDataProp": "email", 
								"sDefaultContent":"–", 
								"mRender": function(data){
									return '<span class="muted">'+data+'</span>';
								},
								"className":"desktop"
							},
							{
								"mDataProp": "_group[0].name", 
								"sDefaultContent": "n/a"
							},	
							{
								"mDataProp": "created", 
								"sDefaultContent": "n/a", 
								"mRender": function(data){
									return '<span class="muted">'+moment(data).format("DD-MM-YYYY")+'</span>';
								},
								"className": "desktop"
							}
						],
						"createdRow": function (row, data, index) {
							$(row).attr('data-id', data._id).children('.td-trigger').append(CheckBoxTable.create(index));
						}
					});
				break;
				case 'usergroup':
					$dataTable = $table.DataTable({
						"sAjaxSource": "/micro/users/group/data",
						"dataSrc": "data",
						"responsive": true,
						"aoColumns": [
							{
								"mDataProp": "_id", 
								"sDefaultContent": "n/a",
								"mRender": function ( data, type, full) {
									return '<i class="fa fa-plus-circle"></i>'; 
								},
								"sClass": "td-trigger", 
								"width": "60px"
							},
							{
								"mDataProp": "name", "sDefaultContent": "n/a"
							},
							{
								"mDataProp": "lvl", "sDefaultContent": "n/a"
							}
						],
						"createdRow": function (row, data, index) {
							$(row).attr('data-id', data._id).children('.td-trigger').append(CheckBoxTable.create(index));
						}
					});
				break;
				case 'pages':
					$dataTable = $table.DataTable({
						"sAjaxSource": "/micro/site/pages/data",
						"dataSrc": "data",
						"responsive": true,
						"aoColumns": [
							{
								"mDataProp": "_id", 
								"sDefaultContent": "n/a",
								"mRender": function ( data, type, full) {
									return '<i class="fa fa-plus-circle"></i>'; 
								},
								"sClass": "td-trigger", 
								"width": "60px"
							},
							{
								"mDataProp": "name.initial", "sDefaultContent": "n/a"
							},
							{
								"mDataProp": "_author[0].name", "sDefaultContent": "n/a", "className": "desktop"
							},
							{
								"mDataProp": "created", "sDefaultContent": "n/a",
								"mRender": function(data){
									return '<span class="muted">'+moment(data).format("DD-MM-YYYY")+'</span>';
								},
								"className": "desktop"
							}
						],
						"createdRow": function (row, data, index) {
							$(row).attr('data-id', data._id).children('.td-trigger').append(CheckBoxTable.create(index));
						}
					});
				break;
				case 'newscategories':
					$dataTable = $table.DataTable({
						"sAjaxSource": "/micro/site/news/categories/data",
						"dataSrc": "data",
						
						"responsive": true,
						"aoColumns": [
							{
								"mDataProp": "_id", 
								"sDefaultContent": "n/a",
								"mRender": function ( data, type, full) {
									return '<i class="fa fa-plus-circle"></i>'; 
								},
								"sClass": "td-trigger", 
								"width": "60px"
							},
							{
								"mDataProp": "name.initial", "sDefaultContent": "n/a"
							},
							{
								"mDataProp": "name.trslt", "sDefaultContent": "n/a"
							},
							{
								"mDataProp": "_author[0].name", "sDefaultContent": "n/a", "className": "desktop"
							},
							{
								"mDataProp": "created", "sDefaultContent": "n/a",
								"mRender": function(data){
									return '<span class="muted">'+moment(data).format("DD-MM-YYYY")+'</span>';
								},
								"className": "desktop"
							}
						],
						"createdRow": function (row, data, index) {
							$(row).attr('data-id', data._id).children('.td-trigger').append(CheckBoxTable.create(index));
						}
					});
				break;
				case 'news':
					$dataTable = $table.DataTable({
						"sAjaxSource": "/micro/site/news/data",
						"dataSrc": "data",
						"responsive": true,
						"aoColumns": [
							{
								"mDataProp": "_id", 
								"sDefaultContent": "n/a",
								"mRender": function ( data, type, full) {
									return '<i class="fa fa-plus-circle"></i>'; 
								},
								"sClass": "td-trigger", 
								"width": "60px"
							},
							{
								"mDataProp": "name.initial", "sDefaultContent": "n/a"
							},
							{
								"mDataProp": "_category[0].name.initial", "sDefaultContent": "n/a", "className": "desktop"
							},
							{
								"mDataProp": "_author[0].name", "sDefaultContent": "n/a", "className": "desktop"
							},
							{
								"mDataProp": "created", "sDefaultContent": "n/a",
								"mRender": function(data){
									return '<span class="muted">'+moment(data).format("DD-MM-YYYY")+'</span>';
								},
								"className": "desktop"
							}
						],
						"createdRow": function (row, data, index) {
							$(row).attr('data-id', data._id).children('.td-trigger').append(CheckBoxTable.create(index));
						}
					});
				break;
				case 'providers':
					$dataTable = $table.DataTable({
						"sAjaxSource": "/micro/store/providers/data",
						"dataSrc": "data",
						"responsive": true,
						"aoColumns": [
							{
								"mDataProp": "_id", 
								"sDefaultContent": "n/a",
								"mRender": function ( data, type, full) {
									return '<i class="fa fa-plus-circle"></i>'; 
								},
								"sClass": "td-trigger", 
								"width": "60px"
							},
							{
								"mDataProp": "name", "sDefaultContent": "n/a"
							},
							{
								"mDataProp": "address", 
								"sDefaultContent": "n/a", 
								"mRender": function(data){
									return '<a class="">'+data+'</a>';
								},
								"className": "none"
							},
							{
								"mDataProp": "unp", "sDefaultContent": "n/a", "className": "none"
							},
							{
								"mDataProp": "phone", "sDefaultContent": "n/a"
							},
							{
								"mDataProp": "email", "sDefaultContent": "n/a"
							},
							{
								"mDataProp": "bank.name", "sDefaultContent": "n/a", "className": "none"
							},
							{
								"mDataProp": "bank.address", 
								"sDefaultContent": "n/a", 
								"mRender": function(data){
									return '<a class="">'+data+'</a>';
								},
								"className": "none"
							},
							{
								"mDataProp": "bank.mfo", "sDefaultContent": "n/a", "className": "none"
							},
							{
								"mDataProp": "bank.expense", "sDefaultContent": "n/a", "className": "none"
							},
							{
								"mDataProp": "created", "sDefaultContent": "n/a",
								"mRender": function(data){
									return '<span class="muted">'+moment(data).format("DD-MM-YYYY")+'</span>';
								},
								"className": "none"
							}
						],
						"createdRow": function (row, data, index) {
							$(row).attr('data-id', data._id).children('.td-trigger').append(CheckBoxTable.create(index));
						}
					});
				break;
				case 'units':
					$dataTable = $table.DataTable({
						"sAjaxSource": "/micro/store/units/data",
						"dataSrc": "data",
						"responsive": true,
						"aoColumns": [
							{
								"mDataProp": "_id", 
								"sDefaultContent": "n/a",
								"mRender": function ( data, type, full) {
									return '<i class="fa fa-plus-circle"></i>'; 
								},
								"sClass": "td-trigger", 
								"width": "60px"
							},
							{
								"mDataProp": "measure", "sDefaultContent": "n/a"
							},
							{
								"mDataProp": "value", "sDefaultContent": "n/a", "className": "desktop"
							}
						],
						"createdRow": function (row, data, index) {
							$(row).attr('data-id', data._id).children('.td-trigger').append(CheckBoxTable.create(index));
						}
					});
				break;
				case 'sale':
					$dataTable = $table.DataTable({
						"bJQueryUI": true,
						"dom": 'T<"clear">lfrtip',
						"tableTools": {
            				"sSwfPath": "/micro/swf/copy_csv_xls_pdf.swf",
	        				"aButtons": [
			                    {
			                    	"sExtends": "xls",
			                    	"sTitle": "Micro Engine - Продажи("+$salePicker.val()+")"
			                    },
			                    {
			                    	"sExtends": "print",
			                    	"sTitle": "Micro Engine - Продажи("+$salePicker.val()+")"
			                    }
	                		]
        				},
						"ajax": {
							"url": "/micro/store/sale/data",
							"type": 'POST',
							"data": function(){
								if(saleDatePicker._d){
									var date = moment(saleDatePicker._d), start, end;
								
									start = date._d.toISOString(); date._d.setHours(23,59,59,999); end = date._d.toISOString();

									return {'$gte': start, '$lt': end}
								} else {
									var start = new Date(), end = new Date();

									start.setHours(0,0,0,0); end.setHours(23,59,59,999);

									return {'$gte': start, '$lt': end}
								}
							}
						},	
						"responsive": true,
						"aoColumns": [
							{
								"mDataProp": "_id", 
								"sDefaultContent": "n/a",
								"mRender": function ( data, type, full) {
									return '<i class="fa fa-plus-circle"></i>'; 
								},
								"sClass": "td-trigger", 
								"width": "60px"
							},
							{
								"mDataProp": "_goods[0].name", "sDefaultContent": "n/a"
							},
							{
								"mDataProp": "_creator[0].name", "sDefaultContent": "n/a", "className": "desktop"
							},
							{
								"mDataProp": "qty", "sDefaultContent": "n/a"
							},
							{
								"mDataProp": "price", "sDefaultContent": "n/a" , "className": "desktop"
							},
							{
								"mDataProp": "sum", "sDefaultContent": "n/a" 
							},
							{
								"mDataProp": "comment", "sDefaultContent": "n/a", "className": "none"
							},
						],
						"footerCallback": function ( row, data, start, end, display ) {
							var api = this.api(), total = 0;

	            			$.each(api.column( 5 ).data(), function(i, p) {
	            				total += p;
	            			});

	            			$('.qweqweqwe').html('<b>'+roadPrice(total)+'</b>')

	            			// $(api.column(5).footer()).html('<b>'+roadPrice(total)+'</b>');
						}

					});
				break;
		};
		function dataTablesReload(){
			CheckBoxTable.clean().reset(); // reset and clean checkboxes list
			$dataTable.ajax.reload(function(){Notification.new('success','<b>Список</b> обновлен')}, true);
			basicPanelTools.setAccess();
		};


		// Header
		var scrollTop, $header = $('.app-header');

		$(window).scroll(function() {
			scrollTop = $(this).scrollTop();

			if(scrollTop > 100){
				$header.addClass('navbar-fixed fadeInDown');
			} else{
				if(scrollTop == 0){
					$header.removeClass('navbar-fixed fadeInDown');
				}
			}
		});

		// Header main menu
		var $menu = $('.app-menu'), $menuItems = $menu.find('.app-menu-item');

		$menuItems.click(function(event) {
			var $this = $(this);
			if(!$this.hasClass('is-open')){
				$menuItems.removeClass('is-open');
				$this.addClass('is-open');
			} else{
				$this.removeClass('is-open');
			}	
		});

		// Form group - Focus
		var $formControl = $('.form-control');

		$formControl.focus(function() {
			$(this).closest('.form-group').addClass('focus');
		});
		$formControl.focusout(function() {
			$(this).closest('.form-group').removeClass('focus');
		});

		// Login page submit form
		$('form#signin').submit(function(event) {
			event.preventDefault();
			var $form = $(this);

			$.ajax({url: '/micro/login',type: 'POST', data: $form.serialize(),
				complete: function() {$form[0].reset();}, 
                statusCode: {
                	200: function(){
                		 window.location.href = "/micro";
                	},
                    403: function(jqXHR) {
                        var error = JSON.parse(jqXHR.responseText);
                        Notification.new('error', error.message);
                    }
                }
			});
		});

		// Forgot password
		$('form#forgot-pass').submit(function(event) {
			event.preventDefault();

			var $form = $(this),
				$email = $form.serializeArray();

			$.ajax({url: '/micro/forgot',type: 'POST', data: $form.serialize(),
				complete: function() {$form[0].reset();}, 
                statusCode: {
                	200: function(){
                		Notification.new('success', 'На адрес '+$email[0].value+', был отправлена инструкция с дальнешими действиями');
                	},
                    403: function(jqXHR) {
                        var error = JSON.parse(jqXHR.responseText);
                        Notification.new('error', error.message);
                    }
                }
			});
		});

		// Forgot password
		$('form#reset-pass').submit(function(event) {
			event.preventDefault();

			var $form = $(this);

			$.ajax({url: window.location.pathname,type: 'POST', data: $form.serialize(),
				complete: function() {$form[0].reset();}, 
                statusCode: {
                	200: function(){
                		Notification.new('success', 'Удачи! Ваш пароль был изменен.');

                		setTimeout(function(){
                			window.location.href = "/micro/login";
                		}, 3000);
                	},
                    403: function(jqXHR) {
                        var error = JSON.parse(jqXHR.responseText);
                        Notification.new('error', error.message);
                    }
                }
			});
		});



		// Profile drop menu
		$('.info-profile').click(function(event) {
			event.preventDefault();
			$(this).toggleClass('drop-is-open');
		});

		// Logout
		$('#signout').click(function(event) {
			event.preventDefault();
			$.ajax({url: '/micro/signout', type: 'GET', statusCode: {
            	200: function(){
            		 window.location.href = "/micro/login";
            	}
            }});
		});

		// Create new page
		$('form#newPage').submit(function(event) {
			event.preventDefault();
			var $form = $(this);

			$.ajax({url: '/micro/site/pages/new',type: 'POST', data: $form.serialize(),
				complete: function() {$form[0].reset();}, 
                statusCode: {
                	200: function(){
                		Notification.new('success', 'Страница успешно создана');
                	},
                    403: function(jqXHR) {
                        var error = JSON.parse(jqXHR.responseText);
                        Notification.new('error', error.message);
                    }
                }
			});
		});

		// Edit page
		$('form#editPage').submit(function(event) {
			event.preventDefault();
			var $form = $(this);

			$.ajax({url: '/micro/site/pages/edit',type: 'POST', data: $form.serialize(),
                statusCode: {
                	200: function(){
                		Notification.new('success', 'Страница успешно изменена');
                	},
                    403: function(jqXHR) {
                        var error = JSON.parse(jqXHR.responseText);
                        Notification.new('error', error.message);
                    }
                }
			});
		});

		// Create new news
		$('form#newNews').submit(function(event) {
			event.preventDefault();
			var $form = $(this);

			console.log($form.serialize());

			$.ajax({url: '/micro/site/news/new',type: 'POST', data: $form.serialize(),
				complete: function() {$form[0].reset();}, 
                statusCode: {
                	200: function(){
                		Notification.new('success', 'Новость успешно создана');
                	},
                    403: function(jqXHR) {
                        var error = JSON.parse(jqXHR.responseText);
                        Notification.new('error', error.message);
                    }
                }
			});
		});

		// Edit news
		$('form#editNews').submit(function(event) {
			event.preventDefault();
			var $form = $(this);

			$.ajax({url: '/micro/site/news/edit',type: 'POST', data: $form.serialize(),
                statusCode: {
                	200: function(){
                		Notification.new('success', 'Новость успешно изменена');
                	},
                    403: function(jqXHR) {
                        var error = JSON.parse(jqXHR.responseText);
                        Notification.new('error', error.message);
                    }
                }
			});
		});


		// Chart

		function ChartRates(options){
			this.canvas = $(options.chart);
			this.url = options.url;
			this.options = {
				labels: [],
				datasets: {
					USD: {
						label: "USD",
						fillColor: "rgba(34,166,80,0.2)",
						strokeColor: "#22a659",
						pointColor: "#22a659",
						pointStrokeColor: "#fff",
						pointHighlightFill: "#fff",
						pointHighlightStroke: "rgba(151,187,205,1)"
					},
					EUR: {
						label: "EUR",
						fillColor: "rgba(151,187,205,0.2)",
						strokeColor: "rgba(151,187,205,1)",
						pointColor: "rgba(151,187,205,1)",
						pointStrokeColor: "#fff",
						pointHighlightFill: "#fff",
						pointHighlightStroke: "rgba(151,187,205,1)"
					},
					RUB: {
						label: "RUB",
						fillColor: "rgba(220,220,220,0.5)",
						strokeColor: "rgba(220,220,220,8)",
						pointColor: "rgba(220,220,220,8)",
						pointStrokeColor: "#fff",
				        pointHighlightFill: "#fff",
				        pointHighlightStroke: "rgba(220,220,220,1)"

					}
				}
			};

			if(!this.canvas.length){return false;}

			this.chart = new Chart(this.canvas.get(0).getContext("2d")).Line(this.options, {responsive: true}); 

			this.get();
		};

		ChartRates.prototype.drop = function(){
			var Rate = this;

			
			$.each(this.chart.datasets, function(i, points) {
				console.log(points.length);
			});
		};
		ChartRates.prototype.get = function(){
			var Rate = this;

			$.ajax({
				url: Rate.url,
				type: 'GET',
				success: function(data){
					
					$.each(data, function(i, rate) {
						Rate.chart.addData([rate.USD, rate.EUR, rate.RUB], moment(rate.date).format('D.MM.YYYY'));
					});
				}
			});	
		}

		ChartRates.prototype.load = function(){ 
				// http://172.16.0.1/
				// http://217.21.36.125/


			// $.ajax({ 
			// 	url: 'http://172.16.0.1/umc/public/api/kurs',
			// 	type: 'GET',
			// 	dataType: 'JSONP',
			// 	success: function(data){
			// 		console.log(data);
			// 	}
			// });

			// $.get('http://172.16.0.1/umc/public/api/kurs', function(data) {
			// 	console.log(data);
			// });

	$.ajax({
		url: 'http://172.16.0.1/umc/public/api/kurs',
		type: 'GET',
		dataType: 'JSONP',
		success: function(data){
			console.log(data.Currency[0].Name);
		}
	});

			
		};



		Chart = new ChartRates({chart: '#chart-rates', url: '/micro/rates'});



		/********************************************************************************************* 
			
			Translit - Class

		*********************************************************************************************/

		function Translit(options){
			this.input = $(options.input);
			this.output = $(options.output);
			this.dictionary = {
                'а': 'a', 'б': 'b', 'в': 'v', 'г': 'g', 'д': 'd', 'е': 'e', 'ё': 'e', 'ж': 'zh',
                'з': 'z', 'и': 'i', 'й': 'j', 'к': 'k', 'л': 'l', 'м': 'm', 'н': 'n',
                'о': 'o', 'п': 'p', 'р': 'r','с': 's', 'т': 't', 'у': 'u', 'ф': 'f', 'х': 'h',
                'ц': 'c', 'ч': 'ch', 'ш': 'sh', 'щ': 'sh','ъ': '-', 'ы': 'y', 'ь': '-', 'э': 'e', 'ю': 'yu', 'я': 'ya',
                ' ': '-', '_': '-', '`': '-', '~': '-', '!': '-', '@': '-',
                '#': '-', '$': '-', '%': '-', '^': '-', '&': '-', '*': '-',
                '(': '-', ')': '-','-': '-', '\=': '-', '+': '-', '[': '-',
                ']': '-', '\\': '-', '|': '-', '/': '-','.': '-', ',': '-',
                '{': '-', '}': '-', '\'': '-', '"': '-', ';': '-', ':': '-',
                '?': '-', '<': '-', '>': '-', '№':'-'
        	};

        	var Translit = this;

        	Translit.input.keyup(function(){
                var _this = $(this).val().toLowerCase(),
                    result = '',
                    curent_sim = '';

                for(i=0; i<_this.length; i++){
                    if(Translit.dictionary[_this[i]] != undefined) {
                        if(curent_sim != Translit.dictionary[_this[i]] || curent_sim != '-'){
                            result += Translit.dictionary[_this[i]];
                            curent_sim = Translit.dictionary[_this[i]];
                        }
                    }
                    else {
                        result += _this[i];
                        curent_sim = _this[i];
                    }
                }

                Translit.output.val(trimStr(result));
        	});

        	function trimStr(result) {
            	result = result.replace(/^-/, '');
            	return result.replace(/-$/, '');
        	}
		};

		new Translit({input: '.translit-input', output: '.translit-output'});


		/********************************************************************************************* 

			Store Tree - Class
			
		*********************************************************************************************/

		function Category(tree, panelTools){
			var Category = this;
			this.tree = $('#store-category');

			if(!this.tree.length){return false;}
			
			this.selected = null;
			this.url = {
				get: '/micro/store/category/data', 
				move:  '/micro/store/category/transfer', 
				rename: '/micro/store/category/rename', 
				create: '/micro/store/category/create', 
				remove: '/micro/store/category/remove'
			};

			$.ajax({
				url: Category.url.get,
				type: 'GET',
				success: function(data){
					var nData = []; 
					$.each(data, function(index, val) {nData.push({id: val._id, parent: val.parent, text: val.text})});
					Category.init(nData);
				}
			});

			this.panel = panelTools;
			this.tools = this.panel.find('[data-tool]');

			this.tools.click(function(event) {
				event.preventDefault();
				
				switch ($(this).data('tool')){
					case 'category-edit':
						if(!$(this).hasClass('disabled')){ category.renameNODE(); } else{ Notification.new('error', 'Ни одна категория не выбранна!'); }
					break;
					case 'category-remove':
						if($(this).hasClass('disabled')){ Notification.new('error', 'Ни одна категория не выбранна!'); }
					break;
				};
			});
		};

		Category.prototype.setAccess = function(){
			var Category = this;

			Category.tools.each(function(i, tool){
				var tool = $(tool);

				if(tool.data('tool') == 'category-edit' || tool.data('tool') == 'category-remove'){	
					if(Category.selected != null){ tool.removeClass('disabled'); } else { tool.addClass('disabled'); }
				}
			});
		};

		Category.prototype.init = function(data){
			var Category = this;

			Category.tree.bind("select_node.jstree", function (e, data) {
				Category.selected = data.node.id;
				Category.setAccess();



				goods.reload().reset();
				turnover.reset().reload();

				turnoverPanelTools.setAccess();

			}).bind("move_node.jstree", function (e, data) {
				$.ajax({
					url: '/micro/store/category/transfer',
					type: 'POST',
					data: {
						id: data.node.id,
						parent: data.parent
					},
					statusCode: {
						200: function(){
							Notification.new('success', 'Категория <b>"'+data.node.text+'"</b>, успешно перенесена.');
						},
						400: function(){
							Notification.new('error', 'Ошибка при переносе категории "'+data.node.text+'"');
						}
					}
				});
			}).bind("create_node.jstree", function (e, data) {
				$.ajax({
					url: Category.url.create,
					type: 'POST',
					data: {
						parent: data.node.parent,
						text: data.node.text
					},
					statusCode: {
						200: function(){
							Notification.new('success', 'Категория "'+data.node.text+'", успешно создана');
							Category.reload();
						}
					}
				});
			}).bind("rename_node.jstree", function (e, data) {
				console.log(data);
				$.ajax({
					url: Category.url.rename,
					type: 'POST',
					data: {
						id: data.node.id,
						old: data.old,
						text: data.text
					},
					statusCode: {
						200: function(){
							Notification.new('success', 'Категория переименована!');
						}
					}
				});
			}).bind("delete_node.jstree", function (e, data) {
				if(data.node.children.length > 0){
					Notification.new('error', 'Удаление невозможно. Категория содержит подкатегории.');
					Category.tree.jstree(true).refresh();

					return false;
				}
				console.log(data);
				$.ajax({
					url: Category.url.remove,
					type: 'POST',
					data: {id: data.node.id},
					statusCode: { 200: function(){ Notification.new('success', 'Категория "'+data.node.text+'", удалена!'); Category.reload() }}
				});
			}).jstree({
			    "plugins" : ["dnd","search"],
				'core' : {
					"multiple" : false,
					"check_callback" : true,
			   		'data' : data
			    } 
			});
		};
		Category.prototype.reload = function(){
			var Category = this;
				$.ajax({
					url: Category.url.get,
					type: 'GET',
					success: function(data){
						var nData = []; 

						$.each(data, function(index, val) {nData.push({id: val._id, parent: val.parent, text: val.text})});

						Category.tree.jstree(true).settings.core.data = nData;
						Category.tree.jstree(true).refresh();

						Category.selected = null;
						Category.setAccess();
					}
				});
			return this;
		};

		// Element tree
		Category.prototype.createNODE = function(name){
			var ref = this.tree.jstree(true), sel = ref.get_selected();
				

			if(!sel.length) { 
				sel = sel[0];
				sel = ref.create_node('#', {"type":"folder", "text": name});
			} else {
				sel = sel[0];
				sel = ref.create_node(sel, {"type":"folder", "text": name});
			}
		};
		Category.prototype.removeNODE = function(){
			var ref = this.tree.jstree(), 
				sel = ref.get_selected();
			
			if(!sel.length) { return false; }
			ref.delete_node(sel);
		};
		Category.prototype.selectNODE = function(){
			var ref = this.tree.jstree(true),
				sel = ref.get_selected();

			return sel[0];
		};
		Category.prototype.renameNODE = function(){
			var ref = this.tree.jstree(true),
				sel = ref.get_selected();

			if(!sel.length) { return false; }

			sel = sel[0]; ref.edit(sel);
		};

		category = new Category($('#store-category'), $('.category-panel-tools'));


		/********************************************************************************************* 

			Store Goods - Class
			
		*********************************************************************************************/
		
		function Goods(options, panelTools){
			var Goods = this;

			if(!options.table.length){return false;}
			this.selected = [];
			this.table = options.table;
			this.datatable = this.table.DataTable({
				"bJQueryUI": true,
				"dataSrc": "data",
				"responsive": true,
				"ajax": {
					"url": "/micro/store/goods/data",
					"type": 'POST',
					"data": {
						id: function(){return category.selected}
					}
				},	
				"aoColumns": [
					{
						"mDataProp": "_id", 
						"sDefaultContent": "n/a",
						"mRender": function ( data, type, full) {
							return '<i class="fa fa-plus-circle"></i>'; 
						},
						"sClass": "td-trigger", 
						"width": "30px"
					},
					{
						"mDataProp": "name", "sDefaultContent": "n/a"
					},
					{
						"mDataProp": "qty", "sDefaultContent": "n/a"
					},
					{
						"mDataProp": "unit", "sDefaultContent": "n/a", "className": "desktop"
					},
					{
						"mDataProp": "purchaseprice", "sDefaultContent": "n/a", "className": "none"
					},
					{
						"mDataProp": "markup", 
						"sDefaultContent": "n/a", 
						"className": "none", 
						"mRender": function(data){
							return rateString(data);
						}
					},
					{
						"mDataProp": "price", "sDefaultContent": "n/a"
					},
					{
						"mDataProp": "sum", "sDefaultContent": "n/a", "className": "desktop"
					},

				],
				"createdRow": function (row, data, index) {
					$(row).attr('data-id', data._id).children('.td-trigger');
				}
			});
			

			this.table.on( 'click', 'td', function (event) {
				var $this = $(this), $row = $this.closest('tr'), $rows = $row.siblings('tr');

				if($(event.target).is($this.children('i.fa'))){return false;}

				if($row.hasClass('row-selected')){
					$row.removeClass('row-selected');
					Goods.selected = [];
					goodsPanelTools.setAccess();
				} else {
					$rows.removeClass('row-selected');
					$row.addClass('row-selected');
					Goods.selected = [];
					Goods.selected.push($row.data('id'));
					goodsPanelTools.setAccess();
				}
				turnover.reset().reload();

				turnoverPanelTools.setAccess();
			});

			// this.panel = panelTools;
			// this.tools = this.panel.find('[data-tool]');

			// this.tools.click(function(event) {
			// 	event.preventDefault();
				
			// 	switch ($(this).data('tool')){
			// 		case 'category-edit':
			// 			if(!$(this).hasClass('disabled')){ category.renameNODE(); } else{ Notification.new('error', 'Ни одна категория не выбранна!'); }
			// 		break;
			// 		case 'category-remove':
			// 			if($(this).hasClass('disabled')){ Notification.new('error', 'Ни одна категория не выбранна!'); }
			// 		break;
			// 	};
			// });
		};

		Goods.prototype.getSelected = function(){
			return this.selected;
		}

		Goods.prototype.reset = function(){
			this.selected = [];
			
			return this;
		}

		Goods.prototype.reload = function(){
			this.datatable.ajax.reload();
			this.reset();
			goodsPanelTools.setAccess()

			return this;
		};

		goods = new Goods({table: $('[table-store=goods]')});


		function Turnover(options){
			var Turnover = this;

			if(!options.table.length){return false;}

			this.selected = [];
			this.table = options.table;
			this.datatable = this.table.DataTable({
				"dataSrc": "data",
				"responsive": true,
				"ajax": {
					"url": "/micro/store/turnover/data",
					"type": 'POST',
					"data": {
						id: function(){return goods.selected[0]}
					}
				},	
				"pageLength": 5,
				"aoColumns": [
					{
						"mDataProp": "_id", 
						"sDefaultContent": "n/a",
						"mRender": function ( data, type, full) {
							return '<i class="fa fa-plus-circle"></i>'; 
						},
						"sClass": "td-trigger", 
						"width": "30px"
					},
					{
						"mDataProp": "type",
						"sDefaultContent": "n/a", 
						"mRender": function(data){
							if(data == 1){
								return 'Приход';
							} else {
								return 'Расход'
							}
						}
					},
					{
						"mDataProp": "doc", 
						"sDefaultContent": "n/a",
						"mRender": function(data){
							if(data == undefined){
								data = 'n/a';
							};
							return '<span class="muted">'+data+'</span>';
						}
					},
					{
						"mDataProp": "date", 
						"sDefaultContent": "n/a",
						"mRender": function(data){
							return '<span class="muted">'+moment(data).format("DD-MM-YYYY")+'</span>';
						},
						"className": "desktop"
					},
					{
						"mDataProp": "qty", "sDefaultContent": "n/a", "className": "desktop"
					},
					{
						"mDataProp": "price", "sDefaultContent": "n/a"
					},
					{
						"mDataProp": "sum", "sDefaultContent": "n/a", "className": "desktop"
					},
					{
						"mDataProp": "_provider[0].name", "sDefaultContent": "n/a", "className": "none"
					},
					{
						"mDataProp": "comment", "sDefaultContent": "n/a", "className": "none"
					},
					{
						"mDataProp": "_creator[0].name", "sDefaultContent": "n/a", "className": "none"
					}

				],
				"createdRow": function (row, data, index) {
					$(row).attr('data-id', data._id).children('.td-trigger');
				}
			});

			this.table.on( 'click', 'td', function (event) {
				var $this = $(this), $row = $this.closest('tr'), $rows = $row.siblings('tr');

				if($(event.target).is($this.children('i.fa'))){return false;}

				if($row.hasClass('row-selected')){
					$row.removeClass('row-selected');
					Turnover.selected = [];
					turnoverPanelTools.setAccess();
				} else {
					$rows.removeClass('row-selected');
					$row.addClass('row-selected');
					Turnover.selected = [];
					Turnover.selected.push($row.data('id'));
					turnoverPanelTools.setAccess();
				}

			});
		};

		Turnover.prototype.getSelected = function(){
			return this.selected;
		}

		Turnover.prototype.reset = function(){
			this.selected = [];
			return this;
		}


		Turnover.prototype.reload = function(){
			this.selected = [];
			this.datatable.ajax.reload();
			turnoverPanelTools.setAccess();
		};

		turnover = new Turnover({table: $('[table-store=turnover]')});


		function nb(str){
			var VRegExp = new RegExp(/^(\s|\u00A0)+/g); 
			return Number(str.replace(/\s/g, ''));
		};
		function rateString(rate){
			return String(rate)+'%';
		};
		function rateNumber(rate){
			return (Number(rate.replace('%',''))+100)/100;
		};	
		function roadPrice(price){
			return (Math.round(price / 100) * 100).toFixed(0);
		};

		/********************************************************************************************* 
			
			Goods Сalculation - Class

		*********************************************************************************************/

		function GoodsCalculation(input, output){
			this.input = input;
			this.output = output;

			this.input.purchaseprice.keyup(function(){
				count();
			});	
			this.input.markup.keyup(function(){
				count();
			});
			this.input.qty.keyup(function(){
				count();
			});

			var Goods = this;

			function count(){
				var markup = rateNumber(Goods.input.markup.val()),
					purchaseprice = nb(Goods.input.purchaseprice.val()),
					qty = nb(Goods.input.qty.val());

				Goods.output.price.val(roadPrice(markup*purchaseprice));
			}

			function pc(str){
				return Number('0.'+str.replace('%',''));
			};
			
		}

		new GoodsCalculation({qty: $("#goods-qty"), purchaseprice: $("#goods-purchaseprice"), markup: $("#goods-markup")}, {price: $("#goods-price")});


		function SaleCalculation(input, output){
			this.input = input;
			this.output = output;

			var Goods = this;

			this.input.qty.keyup(function(){
				Goods.output.sum.val(roadPrice(nb(Goods.input.price.val())*nb(Goods.input.qty.val())));
			});
		};

		new SaleCalculation({qty: $('#goods-sale-qty'), price: $('#goods-sale-price')},{sum: $('#goods-sale-sum')});
		

		/********************************************************************************************* 

			Panel CardTools - Class
			
		*********************************************************************************************/

		// function PanelTools(options, action, selected){
		// 	this.panel = $(options.panel);
		// 	this.tools = this.panel.find('[data-tool]');
		// 	this.trigger = this.panel.children('[data-tool=trigger]');
		// 	this.noti = this.panel.find('.notifications');
		// 	this.card = this.panel.closest('.app-card');

		// 	var PanelTools = this;


		// 	PanelTools.tools.click(function() {
		// 		switch ($(this).data('tool')){
		// 			case 'trigger':
		// 				$(this).toggleClass('is-open').next('.tools-more').toggleClass('is-open');
		// 			break;
		// 			case 'edit-page':
		// 				if(!$(this).hasClass('disabled')){
		// 				 	window.location.href = "/micro/site/pages/edit/"+CheckBoxTable.selected[0];
		// 				}
		// 			break;
		// 			case 'edit-news':
		// 				if(!$(this).hasClass('disabled')){
		// 				 	window.location.href = "/micro/site/news/edit/"+CheckBoxTable.selected[0];
		// 				}
		// 			break;
		// 			case 'table-reload':
		// 				dataTablesReload();
		// 			break;
		// 			case 'card-resize':
		// 				PanelTools.card.toggleClass('fullsize');
		// 			break;
		// 		};
		// 	});

			
		// };
		// PanelTools.prototype.setAccess = function(action){
		// 	var lSelected = CheckBoxTable.selected.length;


		// 	if(lSelected > 0){ 
		// 		PanelTools.noti.addClass('is-visible').html(lSelected); 
		// 	} else{ 
		// 		PanelTools.noti.removeClass('is-visible').html(''); 
		// 	}
		// 	PanelTools.tools.each(function(i, tool){
		// 		var tool = $(tool);

		// 		if(tool.data('tool') == 'edit' || tool.data('tool') == 'edit-page' || tool.data('tool') == 'edit-news'){
		// 			if(lSelected == 1){ tool.removeClass('disabled'); } else{ tool.addClass('disabled'); }	
		// 		}
		// 		if(tool.data('tool') == 'remove'){
		// 			if(lSelected > 0){ tool.removeClass('disabled'); } else{ tool.addClass('disabled'); }	
		// 		}
		// 	});
		// };
		
		// // init
		// panelTools = new PanelTools({panel:'.panel-tools'});

		function PanelTools(options, actions, set){
			this.tools = options.panel.find('a[data-tool]');
			this.trigger = options.panel.find('.trigger');
			this.noti = this.trigger.children('span');
			this.set = set;

			this.source =  options.source;

			this.trigger.click(function(event) {
				$(this).toggleClass('is-open').next('.tools-more').toggleClass('is-open');
			});
			this.tools.click(actions);
		};

		PanelTools.prototype.setAccess = function(){
			var source = this.source.getSelected();

			if(source.length > 0){this.noti.addClass('is-visible').html(source.length);
			} else { this.noti.removeClass('is-visible').html('');}

			// basic
			var PanelTools = this;
			this.tools.each(function(i, tool){PanelTools.set($(tool), source);});
		};



		basicPanelTools = new PanelTools(
			{panel: $('.basic-panel'), source: CheckBoxTable}, function(){
				switch($(this).data('tool')){
					case 'card-resize':
						$(this).closest('.app-card').toggleClass('fullsize');
					break;
					case 'edit-page':
						if(!$(this).hasClass('disabled')){
						 	window.location.href = "/micro/site/pages/edit/"+CheckBoxTable.selected[0];
						}
					break;
					case 'edit-news':
						if(!$(this).hasClass('disabled')){
						 	window.location.href = "/micro/site/news/edit/"+CheckBoxTable.selected[0];
						}
					break;
					case 'table-reload':
						dataTablesReload();
					break;
					case 'load-rates':
						Notification.new('success', 'Актуальные курсы валют');
					break;
					case 'help':
						window.location.href = "/micro/help";
					break;
				}
			}, function(tool, source){
				if(tool.data('tool') == 'edit' || tool.data('tool') == 'edit-page' || tool.data('tool') == 'edit-news'){
					if(source.length == 1){ tool.removeClass('disabled') } else { tool.addClass('disabled') };
				}
				if(tool.data('tool') == 'remove'){
					if(source.length >= 1){ tool.removeClass('disabled') } else { tool.addClass('disabled') };
				}
			}
		);





		goodsPanelTools = new PanelTools(
			{panel: $('.goods-panel'), source: goods}, function(){
				switch($(this).data('tool')){
					case 'card-resize':
						$(this).closest('.app-card').toggleClass('fullsize');
					break;
				}
			}, function(tool, source){
				if(tool.data('tool') == 'supply' || tool.data('tool') == 'remove' || tool.data('tool') == 'edit' || tool.data('tool') == 'sale'){
					if(source.length == 1){ tool.removeClass('disabled') } else { tool.addClass('disabled') };
				}
			}
		);

		turnoverPanelTools = new PanelTools(
			{panel: $('.turnover-panel'), source: turnover}, function(){}, function(tool, source){
				if(tool.data('tool') == 'remove' || tool.data('tool') == 'edit'){
					if(source.length == 1){ tool.removeClass('disabled') } else { tool.addClass('disabled') };
				}
			}
		);


		/********************************************************************************************* 

			Messenger - Class
			
		*********************************************************************************************/

		function Messenger(){
			this.history = [];
			this.messenger = $('ul.messenger');

			// error
			if(!this.messenger.length){$.error('Messenger: Messenger not found;');}

			this.settings = {
				time: 10000,
				duration: 300
			};
		};
		Messenger.prototype.new = function(state, mess){
			var $mess = $('<li class="messenger-message amt fadeInUp '+state+'">'+mess+'<a class="message-close fa fa-times"></a></li>'),
				Messenger = this;

			Messenger.messenger.append($mess);
			Messenger.history.push({time: moment().format('MM.D.YYYY, HH:mm:ss'), message: mess});

			setTimeout(function(){
				$mess.slideUp(Messenger.settings.duration, function(){
					$(this).remove();
				});
			}, Messenger.settings.time);

			$mess.click(function() {
				$(this).slideUp(Messenger.settings.duration, function(){
					$(this).remove();
				});
			});
		};
		Messenger.prototype.clean = function(){
			this.messenger.children('li').remove();
		};
		Messenger.prototype.reset = function(){
			this.clean();
			this.history = [];
			// info
			console.info('Messenger: Reset is successful;')
		};

		// init
		Notification = new Messenger();


		/********************************************************************************************* 
		
			CheckBox - Class

		*********************************************************************************************/

		function Checkbox(name){
			this.name = name,
			this.checkbox = [];
			this.selected = [];
		}
		Checkbox.prototype.addSelected = function(row){
			this.selected.push(row.data('id'));
			return this;
		};
		Checkbox.prototype.delSelected = function(row){
			var Checkbox = this;
			Checkbox.selected.splice( $.inArray(row.data('id'), Checkbox.selected), 1 );
			return this;
		};
		Checkbox.prototype.getSelected = function(){
			return this.selected;
		};

		Checkbox.prototype.clean = function(){
			$.each(this.checkbox, function(i, v){
				v.children('input').prop('checked', false).closest('tr').removeClass('row-selected');
			});
			this.selected = [];
			return this;
		};
		Checkbox.prototype.reset = function(row){
			this.checkbox = [];
			this.selected = [];

			return;
		}
		Checkbox.prototype.create = function(index){
			var Checkbox = this,
				$new = $('<div class="checkbox"><input id="checkbox-'+Checkbox.name+'-'+index+'" type="checkbox"><label for="checkbox-'+Checkbox.name+'-'+index+'"></label></div>');

			Checkbox.checkbox.push($new);

			$new.on('click', 'input', function() {
				var $row = $(this).closest('tr');

				if($row.hasClass('row-selected')){
					$row.removeClass('row-selected');
					Checkbox.delSelected($row);
				} else{
					$row.addClass('row-selected');
					Checkbox.addSelected($row);
				}

				basicPanelTools.setAccess();
			});
			return $new;
		};

		/********************************************************************************************* 
			
			Validate - Class

		*********************************************************************************************/



		// function Validator(form){
		// 	form ? this.form = $(form) : $.error('Validator: Form is not passed');
		// 	this.fields = {input : Validator.form.find('input[validator]'), textarea: Validator.form.find('textarea[validator]'), select: Validator.form.find('select[validator]')};

		// 	var Validator = this;

		// 	// action 
		// 	Validator.fields.input.keyup(function(event) {
		// 		Validator.checkState($(this));
		// 	});	

		// };

		// Validator.prototype.checkState = function(field){
		// 	this.active = {
		// 		field: field,
		// 		methods : field.attr('validator').split(' '),
		// 		states: []
		// 	};

		// 	var Validator = this, type = true, message = '';

		// 	function setState(type, message){
		// 		Validator.active.states.push({type: type, message: type ? 'Поле успешно прошло проверку' : message});
		// 	};

		// 	Validator.active.methods.forEach(function(method){
		// 		switch(method){
		// 			case 'email':
		// 				/^[-\w.]+@([A-z0-9][-A-z0-9]+\.)+[A-z]{2,4}$/.test(Validator.active.field.val()) ? setState(true) : setState(false, 'E-mail введен некорректно');
		// 				break;
		// 			case 'min':
		// 				var length = Validator.active.field.attr('valid-min') || 3;
		// 				Validator.active.field.val().length > length-1 ? setState(true) : setState(false, 'Минимальное количество символов '+length);
		// 				break;
		// 			case 'req-select':
						
		// 				break;
		// 			case 'req':
		// 				Validator.active.field.val().length != 0 ? setState(true) : setState(false, 'Поля обязательно для заполнения');
		// 				break;
		// 			case 'number':
		// 				// it working!
		// 				break;
		// 			case 'pass':
		// 				var $repeatPass = Validator.fields.input.filter('[validator="req repeat-pass"]');
		// 				/(?=^.{5,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/.test(Validator.active.field.val()) ? setState(true) : setState(false, 'Пароль должен содержать cтрочные и прописные латинские буквы, цифры')
		// 				if($repeatPass.length) $repeatPass.parent('.form-group').attr({'valid-state': false, 'valid-message': 'Пароли не совпадают'});
		// 				break;
		// 			case 'repeat-pass':
		// 				Validator.active.field.val() == Validator.fields.input.filter('[validator="req pass"]').val() ? setState(true) : setState(false, 'Пароли не совпадают');
		// 				break;
		// 			default:
		// 				$.error('Type "'+type+'" not found');
		// 				break;
		// 		};
		// 	});

		// 	Validator.active.states.forEach(function(state){
		// 		if(!state.type && type) type = false; 
		// 		if(!state.type){message += !message.length ? state.message : ', '+state.message.toLowerCase()}	
		// 	});

		// 	Validator.active.field.parent('.form-group').attr({
		// 		'valid-state': type,
		// 		'valid-message': message || 'Поле успешно прошло проверку'
		// 	});
		// };	

		// Validator.prototype.submit = function(){
		// 	var Validator = this;

		// 	Validator.fields.each(function(i, field) {
		// 		var $field = $(field);

		// 		!$field.parent('.form-group').attr('valid-state') ? Validator.checkState($field) : console.log('False');
		// 	});
		// };





// var Validator = this, type = true, message = '';

// 			function setState(type, message){
// 				Validator.active.states.push({'type': type, 'message': type ? 'Поле успешно прошло проверку' : message})
// 			};

// 			Validator.active.methods.forEach(function(type){
// 				switch(type){
// 					case 'email':
// 						/^[\w\.\d-_]+@[\w\.\d-_]+\.\w{1,4}$/i.test(Validator.active.field.val()) ? setState(true) : setState(false, 'E-mail введен некорректно');
// 						break;
// 					case 'min':
// 						Validator.active.field.val().length < 4 ? setState(false, 'Минимальное число символов 4') : setState(true);
// 						break;
// 					default:
// 						$.error('Type "'+type+'" not found');
// 						break;
// 				};
// 			});

// 			Validator.active.states.forEach(function(state){
// 				if(!state.type && type) type = false; 
// 				if(!state.type){message += !message.length ? state.message : ', '+state.message.toLowerCase()}	
// 			});

// 			Validator.active.field.parent('.form-group').attr({
// 				'valid-state': type,
// 				'valid-message': message
// 			});






// this.methods = {
// 				email: {
// 					reqExp: /^[\w\.\d-_]+@[\w\.\d-_]+\.\w{1,4}$/i,
// 					err: 'E-mail введен некорректно'
// 				},
// 				password: {
// 					reqExp: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s).*$/i,
// 					err: 'Пароль должен содержать строчные и прописные латинские буквы, цифры, спецсимволы'
// 				}
// 			};












		// Validator.prototype.set = function(){	
		// 	Validator.active.methods.forEach(function(type){
		// 		switch(type){
		// 			case 'email':
		// 				Validator.methods.email.reqExp.test(Validator.active.field.val()) ? pushState(true) : pushState(false);
		// 				break;
		// 			default:
		// 				$.error('Type "'+type+'" not found');
		// 				break;
		// 		};

		// 		initState()
		// 	});

		// 	function initState(type, message){
		// 		field.parent('.form-group').attr({
		// 			"validator-state": type,
		// 			"validator-message": message
		// 		});
		// 	};
		// };

		
		// Validator.prototype.submit = function(){
		// 	var Validator = this;

		// 	this.fields.each(function(i, field) {
		// 		var $field = $(field);

		// 		if(!$field.parent('.form-group').attr('validator-state')) Validator.set($field, false, 'Поле на заполнено');
		// 	});
		// };



























			// function pushState(type){
			// 	console.log(Validator.methods.type);


			// 	// Validator.active.states.push({'type': type, 'message': message || 'Успешно проверено'});
			// };
			// function setState(){
			// 	var type = true, message = '';

			// 	Validator.active.states.forEach(function(state){ 
			// 		if(!state.type && type) type = false; 
			// 		if(!state.type){message += !message.length ? state.message : ', '+state.message.toLowerCase()}	
			// 	});	




			// 	Validator.set(Validator.active.field, type, message);
			// };

	// Validator.fields.keydown(function(event){
	// 			Validator.active = {
	// 				field : $(this), 
	// 				types: $(this).attr('validator').split(' '), 
	// 				states: []
	// 			};

	// 			Validator.active.types.forEach(function(type){
	// 				switch(type){
	// 					case 'email':
	// 						Validator.regExp.email.test(Validator.active.field.val()) ? pushState(true) : pushState(false, 'E-mail введен некорректно');
	// 						break;
	// 					default:
	// 						$.error('Type "'+type+'" not found');
	// 						break;
	// 				};
	// 			});

	// 			setState();
	// 		});

	// 		function pushState(type, message){
	// 			Validator.active.states.push({'type': type, 'message': message || 'Успешно проверено'});
	// 		};
	// 		function setState(){
	// 			var type = true, message = '';

	// 			Validator.active.states.forEach(function(state){
	// 				if(!state.type && type) type = false;
	// 				if(!state.type) message += !message.length ? state.message : ', '+state.message.toLowerCase();
	// 			});

	// 			Validator.set(Validator.active.field, type, message);
	// 		};


		// function Validator(form){
		// 	form ? this.form = $(form) : $.error('Validator: Form is not passed');

		// 	this.fields = this.form.find('[data-validate]');
		// 	this.options = {min: 4, max: 10, state: ['error', 'success']};

		// 	var Validator = this;

		// 	Validator.fields.keydown(function(event) {
		// 		Validator.active = {field : $(this), types: $(this).data('validate').split(' '), states: []};

		// 		Validator.active.types.forEach(function(type){
		// 			switch(type){
		// 				case 'required': 
		// 					Validator.active.field.val().length < 2 ? Validator.active.states.push({type: false, message:'Поле обязательно для заполнения'}) : Validator.active.states.push({type: true}); 
		// 					break;	
		// 				case 'min':
		// 					var min = Validator.active.field.data('validate-min') || Validator.options.min;
		// 					Validator.active.field.val().length <= min-2 ? Validator.active.states.push({type: false, message:'Минимальное число символов: '+min}) : Validator.active.states.push({type: true}); 
		// 					break;
		// 				case 'email': 
		// 					/^[\w\.\d-_]+@[\w\.\d-_]+\.\w{1,4}$/i.test();
		// 					break;
		// 				case 'number':
		// 					if(!(event.which==8 || event.which==44 ||event.which==45 ||event.which==46 ||(event.which>47 && event.which<58))) event.preventDefault(); 
		// 					break;
		// 				case 'password':
		// 					/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s).*$/i.test(Validator.active.field.val()) ? Validator.active.states.push({type: true}) : Validator.active.states.push({type: false, message:'Пароль должен содержать строчные и прописные латинские буквы, цифры, спецсимволы'});
		// 					break;
		// 			};
		// 		});

		// 		set();
		// 	});

		// 	function set(){
		// 		
		// 	};			
		// };

		// Validator.prototype.checkField = function(){
		// 	if(!this.active){ $.error('Active field not found'); return false; }			
		// 	var Validator = this, type = true, message = '';

		// 	Validator.active.states.forEach(function(state){
		// 			if(!state.type && type) type = false;
		// 			if(!state.type) message += !message.length ? state.message : ', '+state.message.toLowerCase();
		// 	});
		// 	Validator.active.field.parent('.form-group').attr({
		// 		'data-validate-state': type ? Validator.options.state[1] : Validator.options.state[0],
		// 		'data-validate-message': type ? 'Поле успешно прошло проверку' : message
		// 	});	
		// };
		// Validator.prototype.submit = function(){
		// 	var type = true;

		// 	$.each(this.fields, function(i, field) {
		// 		var $field = $(field);

		// 		if(!$field.data('validate-state')){$field.attr('validate-state','errror');}
		// 		if($field.parent('.form-group').data('validate-state') == 'error'){ type = false; }
		// 	});

		// 	return type;
		// };

		/********************************************************************************************* 
			
			PopUp - Class

		*********************************************************************************************/

		function PopUp(options, action){
			this.target = $('[data-modal='+options.target+']');
			this.modal = $('#'+options.target);

			if(!this.target.length || !this.modal.length){
				return false;
			}

			this.form = this.modal.find('form');
			this.close = this.modal.find('.cd-modal-close');

			this.settings = {
				duration : 300,
				visibleClass : 'is-visible',
				loadData: options.loadData || false,
				path: options.path
			};
			// actions
			var PopUp = this;

			PopUp.target.click(function(event) {
				event.preventDefault();
				if($(this).hasClass('disabled')){
					return false;
				}
				if(PopUp.settings.loadData){
					PopUp.show().loadData();
				} else{
					PopUp.show();
				}			
			});
			PopUp.form.submit(function(event) {
				event.preventDefault();
				action(PopUp);	
			});
			PopUp.modal.click(function(event) {
				if($(event.target).is(PopUp.modal)){
         			PopUp.hide();
         		}
			});
			PopUp.close.click(function(event) {
				PopUp.hide();
			});

			$(document).keyup(function(event) {
	    		if(event.which == '27'){
	    			PopUp.hide();
	    		}
	    	});
		};

		PopUp.prototype.show = function(){
			var PopUp = this;
			PopUp.modal.fadeIn(PopUp.settings.duration, function(){
	 			$(this).addClass(PopUp.settings.visibleClass);
			});
			return PopUp;
		};
		PopUp.prototype.hide = function(){
			var PopUp = this;
			PopUp.modal.removeClass(PopUp.settings.visibleClass).fadeOut(PopUp.settings.duration);
			return PopUp;
		};
		PopUp.prototype.clean = function(){
			this.form[0].reset();
			return this;
		};
		PopUp.prototype.loadData = function(){
			var PopUp = this, Select = CheckBoxTable.selected[0];

			if(CheckBoxTable.selected[0]){
				$.ajax({
					url: PopUp.settings.path,
					type: 'POST',
					data: {id : Select},
                    statusCode: {
                        403: function(jqXHR) {
                            var error = JSON.parse(jqXHR.responseText);
                            Notification.new('danger', error.message);
                        }
                    },
                    success: function(data){
                    	appendData(jQuery.parseJSON(data));
                    }
				});	
			}
			if(goods.selected[0]){
				$.ajax({
					url: PopUp.settings.path,
					type: 'POST',
					data: {id : goods.selected[0]},
                    statusCode: {
                        403: function(jqXHR) {
                            var error = JSON.parse(jqXHR.responseText);
                            Notification.new('danger', error.message);
                        }
                    },
                    success: function(data){
                    	appendData(jQuery.parseJSON(data));
                    }
				});	
			}
			function appendData(data){
				$.each(data, function(i, val){
					// type: input
					if(val.type == 'input'){
						if(val.name != 'markup'){
							PopUp.form.find('input[name='+val.name+']').val(val.text);
						} else {
							PopUp.form.find('input[name='+val.name+']').val(rateString(val.text));
						}
					}
					// type: select
					if(val.type == 'select'){	
						console.log(val);

						var options = PopUp.form.find('select[name='+val.name+']').children('option');

						options.each(function(i, option){
							if($(option).val() == val.text){
								$(option).attr("selected", true);
							} else{
								$(option).attr("selected", false);
							}
						});
					}
				});
			};
		};

		// PopUp Init
			// Add new user
				test = new PopUp({target: 'add-users'}, function(PopUp){
					$.ajax({
						url: '/micro/users/new',
						type: 'POST',
						data: PopUp.form.serialize(),
						complete: function() {
	                    	PopUp.hide().clean();
	                    }, 
	                    statusCode: {
	                        200: function() {
	                            dataTablesReload();
	                            Notification.new('success', '<b>Добавлен</b> новый пользователь');
	                        },
	                        403: function(jqXHR) {
	                            var error = JSON.parse(jqXHR.responseText);
	                            Notification.new('danger', error.message);
	                        }
	                    }
					});	
				});
			// Remove user
				new PopUp({target: 'remove-users'}, function(PopUp){						
					if(CheckBoxTable.selected.length == 0){
						Notification.new('info','Выберите хотя бы 1 запись');
						PopUp.hide();
					} else{
						$.ajax({
							url: '/micro/users/remove',
							contentType: 'application/json',
							type: 'POST',
							data: JSON.stringify(CheckBoxTable.selected),
							complete: function() {
		                    	PopUp.hide().clean();
		                    }, 
		                    statusCode: {
		                        200: function() {
		                            dataTablesReload();
		                            Notification.new('success','Пользователь(ли) удалены');
		                        },
		                        403: function(jqXHR) {
		                            var error = JSON.parse(jqXHR.responseText);
		                            Notification.new('danger', error.message);
		                        }
		                    }
						});
					}

				});
			// Edit user
				new PopUp({target: 'edit-user', loadData: true, path: '/micro/users/edit_data'}, function(PopUp){
					$.ajax({
						url: '/micro/users/edit',
						type: 'POST',
						data: PopUp.form.serialize(),
						complete: function() {
	                    	PopUp.hide().clean();
	                    }, 
	                    statusCode: {
	                        200: function() {
	                            dataTablesReload();
	                            Notification.new('success','Данные успешно изменены');
	                        },
	                        403: function(jqXHR) {
	                            var error = JSON.parse(jqXHR.responseText);
	                            Notification.new('danger', error.message);
	                        }
	                    }
					});
				});
			// Add new usergroup
				new PopUp({target: 'add-usergroup'}, function(PopUp){
					$.ajax({
						url: '/micro/users/group/new',
						type: 'POST',
						data: PopUp.form.serialize(),
						complete: function() {
	                    	PopUp.hide().clean();
	                    }, 
	                    statusCode: {
	                        200: function() {
	                            dataTablesReload();
	                            Notification.new('success', '<b>Добавлена</b> новая группы');
	                        },
	                        403: function(jqXHR) {
	                            var error = JSON.parse(jqXHR.responseText);
	                            Notification.new('danger', error.message);
	                        }
	                    }
					});
				});
			// Remove usergroups
				new PopUp({target: 'remove-usergroup'}, function(PopUp){
					if(CheckBoxTable.selected.length == 0){
						Notification.new('info','Выберите хотя бы 1 запись');
						PopUp.hide();
					} else{
						$.ajax({
							url: '/micro/users/group/remove',
							contentType: 'application/json',
							type: 'POST',
							data: JSON.stringify(CheckBoxTable.selected),
							complete: function() {
		                    	PopUp.hide().clean();
		                    }, 
		                    statusCode: {
		                        200: function() {
		                            dataTablesReload();
		                            Notification.new('success','Группа(ы) удалена(ы)');
		                        },
		                        403: function(jqXHR) {
		                            var error = JSON.parse(jqXHR.responseText);
		                            Notification.new('danger', error.message);
		                        }
		                    }
						});
					}
				});
			// Edit usergroups
				new PopUp({target: 'edit-usergroup', loadData: true, path: '/micro/users/group/edit_data'}, function(PopUp){
					$.ajax({
						url: '/micro/users/group/edit',
						type: 'POST',
						data: PopUp.form.serialize(),
						complete: function() {
	                    	PopUp.hide().clean();
	                    }, 
	                    statusCode: {
	                        200: function() {
	                            dataTablesReload();
	                            Notification.new('success','Данные успешно изменены');
	                        },
	                        403: function(jqXHR) {
	                            var error = JSON.parse(jqXHR.responseText);
	                            Notification.new('danger', error.message);
	                        }
	                    }
					});
				});
			// Remove usergroups
				new PopUp({target: 'remove-page'}, function(PopUp){
					if(CheckBoxTable.selected.length == 0){
						Notification.new('info','Выберите хотя бы 1 запись');
						PopUp.hide();
					} else{
						$.ajax({
							url: '/micro/site/pages/remove',
							contentType: 'application/json',
							type: 'POST',
							data: JSON.stringify(CheckBoxTable.selected),
							complete: function() {
		                    	PopUp.hide().clean();
		                    }, 
		                    statusCode: {
		                        200: function() {
		                            dataTablesReload();
		                            Notification.new('success','Страница(ы) удалена(ы)');
		                        },
		                        403: function(jqXHR) {
		                            var error = JSON.parse(jqXHR.responseText);
		                            Notification.new('danger', error.message);
		                        }
		                    }
						});
					}
				});
			// Add new newscategories
				new PopUp({target: 'add-newscategories'}, function(PopUp){
					$.ajax({
						url: '/micro/site/news/categories/new',
						type: 'POST',
						data: PopUp.form.serialize(),
						complete: function() {
	                    	PopUp.hide().clean();
	                    }, 
	                    statusCode: {
	                        200: function() {
	                            dataTablesReload();
	                            Notification.new('success', '<b>Добавлена</b> новая категория');
	                        },
	                        403: function(jqXHR) {
	                            var error = JSON.parse(jqXHR.responseText);
	                            Notification.new('danger', error.message);
	                        }
	                    }
					});
				});
			// Edit newscategories
				new PopUp({target: 'edit-newscategories', loadData: true, path: '/micro/site/news/categories/edit_data'}, function(PopUp){
					$.ajax({
						url: '/micro/site/news/categories/edit',
						type: 'POST',
						data: PopUp.form.serialize(),
						complete: function() {
	                    	PopUp.hide().clean();
	                    }, 
	                    statusCode: {
	                        200: function() {
	                            dataTablesReload();
	                            Notification.new('success','Данные успешно изменены');
	                        },
	                        403: function(jqXHR) {
	                            var error = JSON.parse(jqXHR.responseText);
	                            Notification.new('danger', error.message);
	                        }
	                    }
					});
				});
			// Remove newscategories
				new PopUp({target: 'remove-newscategories'}, function(PopUp){
					if(CheckBoxTable.selected.length == 0){
						Notification.new('info','Выберите хотя бы 1 запись');
						PopUp.hide();
					} else{
						$.ajax({
							url: '/micro/site/news/categories/remove',
							contentType: 'application/json',
							type: 'POST',
							data: JSON.stringify(CheckBoxTable.selected),
							complete: function() {
		                    	PopUp.hide().clean();
		                    }, 
		                    statusCode: {
		                        200: function() {
		                            dataTablesReload();
		                            Notification.new('success','Категории(ия) удалена(ы)');
		                        },
		                        403: function(jqXHR) {
		                            var error = JSON.parse(jqXHR.responseText);
		                            Notification.new('danger', error.message);
		                        }
		                    }
						});
					}
				});
			// Remove newscategories
				new PopUp({target: 'remove-news'}, function(PopUp){
					if(CheckBoxTable.selected.length == 0){
						Notification.new('info','Выберите хотя бы 1 запись');
						PopUp.hide();
					} else{
						$.ajax({
							url: '/micro/site/news/remove',
							contentType: 'application/json',
							type: 'POST',
							data: JSON.stringify(CheckBoxTable.selected),
							complete: function() {
		                    	PopUp.hide().clean();
		                    }, 
		                    statusCode: {
		                        200: function() {
		                            dataTablesReload();
		                            Notification.new('success','Новость(и) удалена(ы)');
		                        },
		                        403: function(jqXHR) {
		                            var error = JSON.parse(jqXHR.responseText);
		                            Notification.new('danger', error.message);
		                        }
		                    }
						});
					}
				});
			// Add new providers
				new PopUp({target: 'add-providers'}, function(PopUp){
					$.ajax({
						url: '/micro/store/providers/new',
						type: 'POST',
						data: PopUp.form.serialize(),
						complete: function() {
	                    	PopUp.hide().clean();
	                    }, 
	                    statusCode: {
	                        200: function() {
	                            dataTablesReload();
	                            Notification.new('success', '<b>Добавлена</b> новый поставщик');
	                        },
	                        403: function(jqXHR) {
	                            var error = JSON.parse(jqXHR.responseText);
	                            Notification.new('danger', error.message);
	                        }
	                    }
					});
				});
			// Remove newscategories
				new PopUp({target: 'remove-providers'}, function(PopUp){
					if(CheckBoxTable.selected.length == 0){
						Notification.new('info','Выберите хотя бы 1 запись');
						PopUp.hide();
					} else{
						$.ajax({
							url: '/micro/store/providers/remove',
							contentType: 'application/json',
							type: 'POST',
							data: JSON.stringify(CheckBoxTable.selected),
							complete: function() {
		                    	PopUp.hide().clean();
		                    }, 
		                    statusCode: {
		                        200: function() {
		                            dataTablesReload();
		                            Notification.new('success','Поставщик(и) удален(ы)');
		                        },
		                        403: function(jqXHR) {
		                            var error = JSON.parse(jqXHR.responseText);
		                            Notification.new('danger', error.message);
		                        }
		                    }
						});
					}
				});
			// Edit newscategories
				new PopUp({target: 'edit-providers', loadData: true, path: '/micro/store/providers/edit_data'}, function(PopUp){
					$.ajax({
						url: '/micro/store/providers/edit',
						type: 'POST',
						data: PopUp.form.serialize(),
						complete: function() {
	                    	PopUp.hide().clean();
	                    }, 
	                    statusCode: {
	                        200: function() {
	                            dataTablesReload();
	                            Notification.new('success','Данные успешно изменены');
	                        },
	                        403: function(jqXHR) {
	                            var error = JSON.parse(jqXHR.responseText);
	                            Notification.new('danger', error.message);
	                        }
	                    }
					});
				});
			// Add new unit
				new PopUp({target: 'add-unit'}, function(PopUp){
					$.ajax({
						url: '/micro/store/units/new',
						type: 'POST',
						data: PopUp.form.serialize(),
						complete: function() {
	                    	PopUp.hide().clean();
	                    }, 
	                    statusCode: {
	                        200: function() {
	                            dataTablesReload();
	                            Notification.new('success', '<b>Добавлена</b> новая еденица измерения');
	                        },
	                        403: function(jqXHR) {
	                            var error = JSON.parse(jqXHR.responseText);
	                            Notification.new('danger', error.message);
	                        }
	                    }
					});
				});
			// Remove newscategories
				new PopUp({target: 'remove-units'}, function(PopUp){
					if(CheckBoxTable.selected.length == 0){
						Notification.new('info','Выберите хотя бы 1 запись');
						PopUp.hide();
					} else{
						$.ajax({
							url: '/micro/store/units/remove',
							contentType: 'application/json',
							type: 'POST',
							data: JSON.stringify(CheckBoxTable.selected),
							complete: function() {
		                    	PopUp.hide().clean();
		                    }, 
		                    statusCode: {
		                        200: function() {
		                            dataTablesReload();
		                            Notification.new('success','Еденицы(а) измерения удалены(а)');
		                        },
		                        403: function(jqXHR) {
		                            var error = JSON.parse(jqXHR.responseText);
		                            Notification.new('danger', error.message);
		                        }
		                    }
						});
					}
				});
			// Add new goodscategory
				new PopUp({target: 'add-store-category'}, function(PopUp){
					var name = PopUp.form.find('input[name=name]').val();
					category.createNODE(name);
					PopUp.hide().clean();
				});
			// Remove goodscategories
				new PopUp({target: 'remove-store-category'}, function(PopUp){
					category.removeNODE();
					PopUp.hide().clean();
				});
			// Add new goods
				new PopUp({target: 'add-store-goods'}, function(PopUp){
					if(category.selected == null){Notification.new('error', 'Категория не выбранна'); PopUp.hide(); return false;}

					$.ajax({
						url: '/micro/store/goods/new',
						type: 'POST',
						data: PopUp.form.serialize()+'&category='+category.selected,
						complete: function() {
	                    	PopUp.hide().clean();
	                    }, 
	                    statusCode: {
	                        200: function() {
	                            goods.reload();
	                            Notification.new('success', '<b>Добавлен</b> новый товар');
	                        },
	                        403: function(jqXHR) {
	                            var error = JSON.parse(jqXHR.responseText);
	                            Notification.new('danger', error.message);
	                        }
	                    }
					});
				});
			// Remove goods
				new PopUp({target: 'remove-store-goods'}, function(PopUp){
					if(goods.selected.length == 0){
						Notification.new('danger','Выберите хотя бы 1 запись');
						PopUp.hide();

						return false;
					}

					$.ajax({
						url: '/micro/store/goods/remove',
						contentType: 'application/json',
						type: 'POST',
						data: JSON.stringify({id: goods.selected[0]}),
						complete: function() {
	                    	PopUp.hide().clean();
	                    }, 
	                    statusCode: {
	                        200: function() {
	                            goods.reload().reset();
	                            Notification.new('success','Товар успешно удален');
	                        },
	                        403: function(jqXHR) {
	                            var error = JSON.parse(jqXHR.responseText);
	                            Notification.new('error', error.message);
	                        }
	                    }
					});
				});
			// Remove goods
				new PopUp({target: 'remove-store-turnover'}, function(PopUp){
					if(turnover.selected.length == 0){
						Notification.new('danger','Выберите хотя бы 1 запись');
						PopUp.hide();

						return false;
					}

					$.ajax({
						url: '/micro/store/turnover/remove',
						contentType: 'application/json',
						type: 'POST',
						data: JSON.stringify({id: turnover.selected[0]}),
						complete: function() {
	                    	PopUp.hide().clean();
	                    }, 
	                    statusCode: {
	                        200: function() {
	                            turnover.reload();
	                            Notification.new('success','Движение товара успешно удалено');
	                        },
	                        403: function(jqXHR) {
	                            var error = JSON.parse(jqXHR.responseText);
	                            Notification.new('error', error.message);
	                        }
	                    }
					});
				});
			// Edit goods
				new PopUp({target: 'edit-store-goods', loadData: true, path: '/micro/store/goods/edit_data'}, function(PopUp){
					$.ajax({
						url: '/micro/store/goods/edit',
						type: 'POST',
						data: PopUp.form.serialize(),
						complete: function() {
	                    	PopUp.hide().clean();
	                    }, 
	                    statusCode: {
	                        200: function() {
	                            goods.reload().reset();
	                            turnover.reload();
	                            Notification.new('success','Данные успешно изменены');
	                        },
	                        403: function(jqXHR) {
	                            var error = JSON.parse(jqXHR.responseText);
	                            Notification.new('danger', error.message);
	                        }
	                    }
					});
				});
			// Supply goods
				new PopUp({target: 'supply-store-goods', loadData: true, path: '/micro/store/goods/supply_data'}, function(PopUp){
					$.ajax({
						url: '/micro/store/goods/supply',
						type: 'POST',
						data: PopUp.form.serialize()+'&type=1',
						complete: function() {
	                    	PopUp.hide().clean();
	                    }, 
	                    statusCode: {
	                        200: function() {
	                            goods.reload();
	                            turnover.reset().reload();
								turnoverPanelTools.setAccess();

	                            Notification.new('success','Поступление товара успешно проведено');
	                        },
	                        403: function(jqXHR) {
	                            var error = JSON.parse(jqXHR.responseText);
	                            Notification.new('danger', error.message);
	                        }
	                  	}
					});
				});
			// Sale goods
				new PopUp({target: 'sale-store-goods', loadData: true, path: '/micro/store/goods/sale_data'}, function(PopUp){
					$.ajax({
						url: '/micro/store/goods/sale',
						type: 'POST',
						data: PopUp.form.serialize()+'&type=0',
						complete: function() {
	                    	PopUp.hide().clean();
	                    }, 
	                    statusCode: {
	                        200: function() {
	                            goods.reload();
	                           	turnover.reset().reload();
								turnoverPanelTools.setAccess();
	                            Notification.new('success','Товар успешно продан');
	                        },
	                        403: function(jqXHR) {
	                            var error = JSON.parse(jqXHR.responseText);
	                            Notification.new('danger', error.message);
	                        }
	                  	}
	                });
				});
				

			/********************************************************************************************* 
				Help Page
			*********************************************************************************************/


			var $help = $('.help-content'),
				helpSettings = {
					path : "/micro/help",
					item: '.element-item',
					transition: '0.2s'
				};

			function helpInit(){
				if($help.length == 0 && location.path != helpSettings.path){return false;}

				var $btnFilter = $('.help-filter button'),
					$helpItems = $('.element-item');

				$help.isotope({
					itemSelector: helpSettings.item,
					hiddenStyle: {
    					opacity: 0
					},
					visibleStyle: {
						opacity: 1
					},
					transitionDuration : helpSettings.transition
				});

				var filterFns = {
					numberGreaterThan50: function() {
					var number = $(this).find('.number').text();
					return parseInt( number, 10 ) > 50;
				}, ium: function() {
						var name = $(this).find('.name').text();
						return name.match( /ium$/ );
					}
				};

				$btnFilter.click(function(event) {
					var filterValue = $( this ).attr('data-filter');
					filterValue = filterFns[ filterValue ] || filterValue;
					$help.isotope({ filter: filterValue });

					$(this).addClass('is-checked').siblings($btnFilter).removeClass('is-checked');
				});

				$helpItems.children('a').click(function(event) {
					var $this = $(this);
					$this.parent($helpItems).toggleClass('is-open');
					$help.isotope('layout');
				});	

				console.info('$help: init');			
			}

			helpInit();


			/********************************************************************************************* 
				Calendar
			*********************************************************************************************/


			var t = new Date, 
				i = t.getDate(), 
				o = t.getMonth(), 
				r = t.getFullYear();

			var $calendar = $('#calendar'),
				$calendarItems = $('#calendar-items li');

			function calendarInit(){
				if($calendar.length == 0){return false;}

				var settings = {
					header: {left: "prev,next",center: "title",right: "today"},
	                buttonText: {prev: '', next: '', today: "Сегодня", month: "Месяц", week: "Неделя", day: "День"},
	                dayNamesShort: ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'],
	                dayNames: ['Воскресенье', 'Понедельник','Вторник','Среда','Четверг','Пятница','Суббота'],
	                monthNames: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'],
                	editable: true,  droppable: true, draggable: true, firstDay: 1,
	                eventSources: [{
	                	url: '/micro/events',
	                	color: '#22a659',
	                	padding: "10px",
	                	textColor: '#fff',
	                	className: 'ajax-event'
	                }],
	 				eventDrop: function(event, delta, revertFunc){
	 					$.ajax({
							url: '/micro/events/transfer',
							contentType: 'application/json',
							type: 'POST',
							data: JSON.stringify({
								id: event._id,
								start: event.start._d
							}),
	 						statusCode: {
	 							200: function(){
	 								Notification.new('success', '<b>'+event.title+'</b> изменен');
	 							},
	 							403: function(){
	 								revertFunc();
	 								Notification.new('danger','Ваш уровень доступа не позволяет выполнить данное действие');
	 							}
	 						}
						});	
	 				},
	 				drop: function(date) {
	 					var originalEventObject = $(this).data('eventObject'),
	 						copiedEventObject = $.extend({
	 							start: date,
	 							title : $(this).text()
	 						}, originalEventObject);

	 						$.ajax({
	 							url: '/micro/events/new',
								contentType: 'application/json',
								type: 'POST',
								data: JSON.stringify({
									id: copiedEventObject._id,
									start: copiedEventObject.start._d,
									title: copiedEventObject.title
								}),
								statusCode: {
									200: function(){
										$calendar.fullCalendar( 'refetchEvents' );
									}
								}
	 						});
	 				}, 
	 				eventClick: function(calEvent, jsEvent, view) {
	 					$.ajax({
 							url: '/micro/events/remove',
							contentType: 'application/json',
							type: 'POST',
							data: JSON.stringify({
								id: calEvent._id
							}),
							statusCode: {
								200: function(){
									$calendar.fullCalendar( 'removeEvents', calEvent._id );
									Notification.new('success','<b>'+calEvent.title+'</b> удален');
								},
								403: function(jqXHR) {
									Notification.new('danger','Ваш уровень доступа не позволяет выполнить данное действие');
	                        	}
							}
 						});
	 				}
				},
				$events = $('#calendar-items li').draggable({
					zIndex: 999,
					revert: true,
					revertDuration: 100
				});



				$('#calendar-draggable-remove').droppable({
					drop: function(){
						alert('x1');
					}
				});

				$calendar.fullCalendar(settings);
			}

			calendarInit();

			/********************************************************************************************* 
			
				СountTo

			*********************************************************************************************/

			$.fn.countTo = function (options) {
				options = options || {};

				return $(this).each(function () {
					var settings = $.extend({}, $.fn.countTo.defaults, {
						from:            $(this).data('from'),
						to:              $(this).data('to'),
						speed:           $(this).data('speed'),
						refreshInterval: $(this).data('refresh-interval'),
						decimals:        $(this).data('decimals')
					}, options);
					var loops = Math.ceil(settings.speed / settings.refreshInterval),
						increment = (settings.to - settings.from) / loops;

					var self = this,
						$self = $(this),
						loopCount = 0,
						value = settings.from,
						data = $self.data('countTo') || {};

					$self.data('countTo', data);
					if (data.interval) {
						clearInterval(data.interval);
					}
					data.interval = setInterval(updateTimer, settings.refreshInterval);
					render(value);

					function updateTimer() {
						value += increment;
						loopCount++;

						render(value);

						if (typeof(settings.onUpdate) == 'function') {
							settings.onUpdate.call(self, value);
						}

						if (loopCount >= loops) {
							// remove the interval
							$self.removeData('countTo');
							clearInterval(data.interval);
							value = settings.to;

							if (typeof(settings.onComplete) == 'function') {
								settings.onComplete.call(self, value);
							}
						}
					}

					function render(value) {
						var formattedValue = settings.formatter.call(self, value, settings);
						$self.text(formattedValue);
					}
				});
			};

			$.fn.countTo.defaults = {
				from: 0,               
				to: 0,                 
				speed: 1000,           
				refreshInterval: 100,  
				decimals: 0,           
				formatter: formatter,  
				onUpdate: null,        
				onComplete: null       
			};

			function formatter(value, settings) {
				return value.toFixed(settings.decimals);
			}

			// init CountTo	
			$("[data-toggle='counter']").countTo();
	});
})(jQuery);