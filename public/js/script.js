(function($){
	var $appLoad = window.safari || window.chrome ? $('body'): $('html');

	$appLoad.ready(function(){
		// hide loading/preloader
		var $appLoading = $('.app-loading');

		setTimeout(function(){
			$appLoading.fadeOut(400, function(){console.log('App Ready!')});
		}, 500);

		// dataTables
		var $table = $('table.app-table'), $dataTable,
			CheckBoxTable = new Checkbox('table');
			
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
		};
		function dataTablesReload(){
			CheckBoxTable.clean().reset(); // reset and clean checkboxes list
			panelTools.setSelected(); // recalculate selected checkboxes
			$dataTable.ajax.reload(function(){Notification.new('success','<b>Список</b> обновлен')}, true);
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

			Panel CardTools - Class
			
		*********************************************************************************************/

		function PanelTools(options){
			this.panel = $(options.panel);
			this.tools = this.panel.find('[data-tool]');
			this.trigger = this.panel.children('[data-tool=trigger]');
			this.noti = this.panel.find('.notifications');
			this.card = this.panel.closest('.app-card');

			var PanelTools = this;

			PanelTools.tools.click(function() {
				switch ($(this).data('tool')){
					case 'trigger':
						$(this).toggleClass('is-open').next('.tools-more').toggleClass('is-open');
					break;
					case 'edit-page':
						if(!$(this).hasClass('disabled')){
						 	window.location.href = "/micro/site/pages/edit/"+CheckBoxTable.selected[0];
						}
					break;
					case 'table-reload':
						dataTablesReload();
					break;
					case 'card-resize':
						PanelTools.card.toggleClass('fullsize');
					break;
				};
			});
		};
		PanelTools.prototype.setSelected = function(){
			var PanelTools = this,
				lSelected = CheckBoxTable.selected.length;

			if(lSelected > 0){ 
				this.noti.addClass('is-visible').html(lSelected); 
			} else{ 
				this.noti.removeClass('is-visible').html(''); 
			}

			PanelTools.tools.each(function(i, tool){
				var tool = $(tool);

				if(tool.data('tool') == 'edit' || tool.data('tool') == 'edit-page'){
					if(lSelected == 1){ tool.removeClass('disabled'); } else{ tool.addClass('disabled'); }	
				}
				if(tool.data('tool') == 'remove'){
					if(lSelected > 0){ tool.removeClass('disabled'); } else{ tool.addClass('disabled'); }	
				}
			});
		};
		// init
		panelTools = new PanelTools({panel:'.panel-tools'});


		/********************************************************************************************* 

			Messenger - Class
			
		*********************************************************************************************/

		function Messenger(){
			this.history = [];
			this.messenger = $('ul.messenger');
			this.settings = {
				time: 10000,
				duration: 300
			};
			// error
			if(!this.messenger.length){$.error('Messenger: Messenger not found;');}
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

				panelTools.setSelected();
			});
			return $new;
		};

		/********************************************************************************************* 
			
			PopUp - Class

		*********************************************************************************************/

		function PopUp(options, action){
			this.target = $('[data-modal='+options.target+']');
			this.modal = $('#'+options.target);

			if(!this.target.length || !this.modal.length){
				console.log('PopUp: "'+options.target+'", not found Target or Modal Window')
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
			function appendData(data){
				$.each(data, function(i, val){
					// type: input
					if(val.type == 'input'){
						PopUp.form.find('input[name='+val.name+']').val(val.text);
					}
					// type: select
					if(val.type == 'select'){				
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
				new PopUp({target: 'add-users'}, function(PopUp){
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
	 								Notification.new('error', '<b>'+event.title+'</b> ошибка');
	 								revertFunc();
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