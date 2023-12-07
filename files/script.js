// функция начала новой игры
function refresh() {
	let reset = confirm("Вы уверены что хотите начать игру заново?");
	if (reset) {
		window.location.href = window.location.href
	}
}
// получение ширины окна браузера
function checkWidth() {
	let windowWidth = $(window).width();
	return windowWidth;
}
// получение высоты окна браузера
function checkHeight() {
	let windowHeight = $(window).height();
	$('.your-side__img').css('height', windowHeight - 100)
	return windowHeight;
}
checkWidth();
checkHeight()
$(window).resize(function () {
	checkWidth()
	checkHeight()
});
// создание никнейма

let yourName = prompt('Введи свой никнейм');
if (+yourName == 0) {
	yourName = 'user-' + Math.round(-0.5 + Math.random() * 1000);
	$('body').removeClass('blur')
}
yourName = yourName.length > 20 ? yourName = yourName.substr(0, 20) + '...' : yourName
document.querySelector('.your-name').innerHTML = yourName

// if ($.cookie('name')) {
// } else {
// 	var myAry = Math.random();
// 	$.cookie('name', JSON.stringify(myAry));
// 	var storedAry = JSON.parse($.cookie('name'));
// }
// выбор режима игры
$('.mode').click(function () {
	$('.modes').css('pointer-events', 'none')
	//$('.modes').css('overflow-y', 'hidden')
	$('body').css('overflow-y', 'hidden')
	// определение направления смещения выбранного режима
	let distLeft = this.offsetLeft
	let distWidth = document.querySelector('.modes').offsetWidth
	let distWidthMode = this.offsetWidth
	let distRigth = distWidth - distLeft - distWidthMode
	let znack = 0
	if (Math.round(distLeft / 10) * 10 == Math.round(distRigth / 10) * 10) {
		znack = 0
	} else if (Math.round(distLeft / 10) * 10 < Math.round(distRigth / 10) * 10) {
		znack = 1
	} else if (Math.round(distLeft / 10) * 10 > Math.round(distRigth / 10) * 10) {
		znack = -1
	}
	// анимация для невыбранных режимов
	$(this).addClass('selected-mode')
	let thisClick = this
	for (let i = 0; i < $('.mode').length; i++) {
		if (document.querySelector('.modes').children[i].className.split(' ').includes('selected-mode') == false) {
			document.querySelector('.modes').children[i].classList.add('not-mode')
			let elem = document.querySelector('.modes').children[i]
			$(elem).css('transform', `translateY(${-(elem.getBoundingClientRect().top + elem.clientHeight + 100)}px)`)
			$(elem).css('transition', '.5s ease-in')
			$(elem).css('opacity', '0')
		}
	}
	$(window).resize(function () {
		modeAnimFunc()
	});
	// анимация выбранного режима
	modeAnimFunc()
	function modeAnimFunc() {
		setTimeout(function () {
			let selectPos = (checkHeight() - thisClick.offsetHeight - thisClick.getBoundingClientRect().top * 2) / 2
			let selectModeWidth = thisClick.offsetWidth
			$('.modes__title').addClass('opacity')
			// проверка размера выбранного элемента 
			// если 100%
			if (Math.round(document.querySelector('.mode').offsetWidth / 10) * 10 != Math.round(document.querySelector('.modes').offsetWidth / 10) * 10) {
				$(thisClick).css('transform', `translate(${(checkWidth() - selectModeWidth) / 2 * znack}px, ${selectPos}px) scale(1.7)`)
				$(thisClick).css('transition', '0.4s ease-in')
				setTimeout(function () {
					$(thisClick).css('transform', `translate(${(checkWidth() - selectModeWidth) / 2 * znack}px, ${selectPos}px) scale(1.5)`)
					$(thisClick).css('transition', '0.5s ease')
					setTimeout(function () {
						$(thisClick).css('opacity', 0)
						$(thisClick).css('transition', '1s')
					}, 1000)
				}, 400)
			}
			// если не 100%
			else {
				$(thisClick).css('z-index', '99')
				$(thisClick).css('transform', `translateY(${-thisClick.getBoundingClientRect().top + 22}px)`)
				setTimeout(function () {
					$(thisClick).css('opacity', 0)
					$(thisClick).css('transition', '1s')
				}, 1900)
			}
		})
	}
	// функция старта выбранного режима
	function showGame() {
		setTimeout(function () {
			$('._container').removeClass('opacity')
			$('.sides').css('z-index', 99)
			setTimeout(function () {
				$('.wrapp-modes').removeClass('active')
			}, 500)
			setTimeout(function () {
				$('.games').addClass('opacity')
			}, 500)
		}, 1900)
	}
	// оперделение выбранного режима
	let modeGame = this.getAttribute("mode")
	if (modeGame == 'classic') {
		createGame(gameClassic)
		showGame()
	} else if (modeGame == 'spok') {
		createGame(gameSpok)
		showGame()
	} else if (modeGame == 'creativ') {
		setTimeout(function () {
			$('.games').removeClass('opacity')
			setTimeout(function () {
				$('.wrapp-modes').removeClass('active')
			}, 500)
		}, 1900)
		$('.game').click(function () {
			if (this.id == 'game-create') {
				let submitError = 0
				let submitErrorSelect = 0
				let submitErrorSubject = 0
				setTimeout(function () {
					$('.games').addClass('opacity')
					setTimeout(function () {
						$('.create-game').removeClass('opacity')
						$('.create-game').css('z-index', 20)
						$('body').css('overflow', 'auto')
					}, 500)
				}, 100)

				$('.create-game__regulations').click(function () {
					$('.create-game__info').slideToggle()
					$('.arrow-down').toggleClass('arrow-up')
				})
				$('.create-game__subjects-add').click(function () {
					function createCombTr() {
						// формирование новой строки без select
						combTr = document.createElement('tr')
						let tImg = document.createElement('td')
						tImg.classList.add('t-body', 't-img')
						tImg.appendChild(document.createElement('input')).placeholder = 'Ссылка'
						let tComb = document.createElement('td')
						tComb.classList.add('t-body', 't-comb')
						tComb.appendChild(document.createElement('div')).classList.add('t-comb-select')
						let tWarning = document.createElement('p')
						tWarning.classList.add('comb-warning')
						tWarning.innerHTML = '<b>Внимание:</b> выбранные предметы не могут совпадать'
						tComb.appendChild(tWarning)
						combTr.appendChild(document.createElement('td')).classList.add('t-body', 't-subject')
						combTr.appendChild(tComb)
						combTr.appendChild(tImg)
						document.querySelector('.create-game__comb tbody').append(combTr);
						// добавление необходимых select для всех строк
						for (let i = 0; i < $('.create-game__comb tbody tr').length; i++) {
							// добавление option в пустые select
							for (let a = $('.create-game__comb tbody tr').eq(i).find('select').length; a < ($('.create-game__subjects-body p').length - 1) / 2; a = $('.create-game__comb tbody tr').eq(i).find('select').length) {
								let tSelect = document.createElement('select')
								for (let b = 0; b < $('.create-game__subjects-body p').length; b++) {
									let tOption = document.createElement('option')
									tOption.value = $('.create-game__subjects-body p').eq(b).children('input')[0].value;
									tOption.text = $('.create-game__subjects-body p').eq(b).children('input')[0].value
									if (b == $('.create-game__comb tbody tr').eq(i).index()) {
										tOption.disabled = true
										tOption.classList.add('option-disabled-start')
									}
									tSelect.appendChild(tOption)
								}
								$('.create-game__comb tbody tr .t-comb').eq(i).children('.t-comb-select').append(tSelect)
							}
							// добавление option в ранее существовавшие select
							for (let a = 0; a < $('.create-game__comb tbody tr').eq(i).find('select').length; a++) {
								for (let b = $('.create-game__comb tbody tr').eq(i).find('select').eq(a).children('option').length; b < $('.create-game__subjects-body p').length; b = $('.create-game__comb tbody tr').eq(i).find('select').eq(a).children('option').length) {
									let tOption = document.createElement('option');
									if (b == $('.create-game__comb tbody tr').eq(i).index()) {
										tOption.disabled = true
										tOption.classList.add('option-disabled-start')
									}
									$('.create-game__comb tbody tr').eq(i).find('select').eq(a).append(tOption)
								}
							}
						}
					}
					function createSubjectInput() {
						let createInput = document.createElement('p')
						createInput.appendChild(document.createElement('input'));
						let createSpan = document.createElement('span')
						createSpan.className = 'create-game__subjects-remove'
						createSpan.innerHTML = '&#10006;';
						createInput.appendChild(createSpan)
						document.querySelector('.create-game__subjects-body').append(createInput);
					}
					// проверка на чётность предметов и добавление одного или двух элементов
					if ($('.create-game__subjects-body p').length % 2 == 0) {
						// создание предмета
						createSubjectInput()
						// создание строки
						createCombTr()
					} else {
						// создание двух предметов
						createSubjectInput()
						createSubjectInput()

						// создание двух строк комбинаций
						createCombTr()
						createCombTr()
					}
					// проверка на количество предметов
					if ($('.create-game__subjects-body p').length % 2 == 0) {
						$('.create-game__subjects-error').addClass('active')
					} else {
						$('.create-game__subjects-error').removeClass('active')
					}

					checkFullness()
				})
				$("body").on("click", ".create-game__subjects-remove", function () {
					let thisClick = this
					$(this).closest('p').addClass('opacity')
					setTimeout(function () {
						for (let i = 0; i < $('.create-game__comb tbody tr').length; i++) {
							if ($('.create-game__comb tbody tr').eq(i).find('select').length > ($('.create-game__subjects-body p').length - 1) / 2) {
								$('.create-game__comb tbody tr').eq(i).find('select').eq($('.create-game__comb tbody tr').eq(i).find('select').length - 1).remove()
							}
							for (let b = 0; b < $('.create-game__comb tbody tr').eq(i).find('select').length; b++) {
								$('.create-game__comb tbody tr').eq(i).find('select').eq(b).children('option').eq($(thisClick).parent().index()).remove()
							}
						}
						$('.create-game__comb tbody tr').eq($(thisClick).parent().index()).remove()
						$(thisClick).closest('p').remove()
						checkSelected(0)
						if ($('.create-game__subjects-body p').length % 2 == 0) {
							$('.create-game__subjects-error').addClass('active')
						} else {
							$('.create-game__subjects-error').removeClass('active')
						}
						checkFullness()
					}, 500)
				})
				checkFullness()
				$(function () {
					$(document).on("change keyup input click", ".create-game__subjects-body p input", function () {
						let thisValue = $(this).val()
						let thisClick = this
						$('.create-game__comb tbody tr').eq($(this).parent().index()).children('td')[0].innerHTML = this.value
						// редактирование текста и значений option
						for (let i = 0; i < $('.create-game__comb tbody tr').length; i++) {
							for (let b = 0; b < $('.create-game__comb tbody tr').eq(i).find('select').length; b++) {
								$('.create-game__comb tbody tr').eq(i).find('select').eq(b).children('option').eq($(thisClick).parent().index())[0].value = thisValue
								$('.create-game__comb tbody tr').eq(i).find('select').eq(b).children('option').eq($(thisClick).parent().index())[0].text = thisValue
								checkSelected($('.create-game__comb tbody tr').eq(i).find('select').eq(b))
							}
						}
						checkFullness()
					})
				});
				// функция поиска одинаковых выбранных значений в разных select
				function checkSelected2(perem, error) {
					for (let i = 0; i < $('.create-game__comb tbody tr').eq(perem).find('select').length; i++) {
						let optionSelected = $('.create-game__comb tbody tr').eq(perem).find('select').eq(i).children("option:selected").text()
						// перебор проверочных select
						for (let b = 0; b < $('.create-game__comb tbody tr').eq(perem).find('select').length; b++) {
							// поиск выбранных одинаковых значений
							if ($('.create-game__comb tbody tr').eq(perem).find('select').children(`option:selected[value='${optionSelected}']`).length > 1) {
								$('.create-game__comb tbody tr').eq(perem).find('select').children(`option:selected[value='${optionSelected}']`).parent().addClass('select-warning')
								$('.create-game__comb tbody tr').eq(perem).find('.comb-warning').addClass('active')
								submitErrorSelect += 1
								error += 1
							} else {
								$('.create-game__comb tbody tr').eq(perem).find('select').children(`option:selected[value='${optionSelected}']`).parent().removeClass('select-warning')
							}
						}
					}
					checkSubmitError()
					return error
				}
				function checkSelected(elem) {
					let error = 0
					let trIndex = 0;
					if (elem) {
						trIndex = $(elem).parents('tr').index()
						checkSelected2(trIndex, 0)
						// если select с ошибками нет, убираем сообщение об ошибке
						if ($('.create-game__comb tbody tr').eq(trIndex).find('select.select-warning').length == 0) {
							$('.create-game__comb tbody tr').eq(trIndex).find('.comb-warning').removeClass('active')
						}
					} else {
						for (let a = 0; a < $('.create-game__comb tbody tr').length; a++) {
							trIndex = a
							error = checkSelected2(trIndex, error)
							// если select с ошибками нет, убираем сообщение об ошибке
							if ($('.create-game__comb tbody tr').eq(trIndex).find('select.select-warning').length == 0) {
								$('.create-game__comb tbody tr').eq(trIndex).find('.comb-warning').removeClass('active')
							}
						}
					}
					let selectWarning = 0
					for (let a = 0; a < $('.create-game__comb tbody tr').length; a++) {
						// если select с ошибками нет, убираем сообщение об ошибке
						if ($('.create-game__comb tbody tr').eq(a).find('select.select-warning').length != 0) {
							selectWarning += 1
						}
					}
					if (selectWarning == 0) {
						submitErrorSelect = 0
					}
					checkSubmitError()
					return error
				}
				$(function () {
					$(document).on('change', '.t-comb select', function () {
						checkSelected(this)
					})
				})
				function checkFullness() {
					let error = 0;
					let value = 0;
					let arr = [];
					// проверка на заполненность полей и их количество
					for (let i = 0; i < $('.create-game__subjects-body p').length; i++) {
						arr.push($('.create-game__subjects-body p').eq(i).children('input')[0].value)
						if (+$('.create-game__subjects-body p').eq(i).children('input')[0].value == 0) {
							$('.create-game__subjects-warning').addClass('active')
							error += 1;
						} else {
							value = value + 1
						}
						if (value == $('.create-game__subjects-body p').length) [
							$('.create-game__subjects-warning').removeClass('active')
						]
					}
					// удаление пустых значений
					arr = arr.filter((element, index) => {
						if (+element != 0) {
							return element
						}
					})
					// проверка на повтор элементов
					let a = 0
					for (let i = 0; i < arr.length; i++) {
						for (let b = 0; b < arr.length; b++) {
							if (arr[i] == arr[b] && i != b) {
								a += 1
								$('.create-game__subjects-warning2').addClass('active')
								error += 1;
							}
							if (a <= 0) {
								$('.create-game__subjects-warning2').removeClass('active')
							}
						}
					}
					// деактивация таблицы комбинаций при наличии ошибок
					let b = 0
					for (let i = 0; i < $('.error').length; i++) {
						if ($('.error')[i].className.includes('active')) {
							b += 1
							$('.create-game__comb').css('pointer-events', 'none')
							$('.create-game__comb').css('opacity', 0.2)
							submitErrorSubject += 1
						}
						if (b <= 0) {
							$('.create-game__comb').css('pointer-events', 'auto')
							$('.create-game__comb').css('opacity', 1)
							submitErrorSubject = 0
						}
					}
					checkSubmitError()
					return error;

				}
				function checkSubmitError() {
					console.log(submitErrorSubject)
					console.log(submitErrorSelect)
					submitError = submitErrorSubject + submitErrorSelect;
					if (submitError == 0) {
						$('.submit').prop('disabled', false)
						$('.submit').css('pointer-events', 'auto')
						$('.submit').css('opacity', 1)
					} else {
						$('.submit').prop('disabled', true)
						$('.submit').css('pointer-events', 'none')
						$('.submit').css('opacity', 0.2)
					}
				}
				// функция которая при отправке проверяет не бьёт ли элемент сам себя
				function checkDisabled() {
					let error = 0
					for (let i = 0; i < $('.create-game__comb tbody tr').length; i++) {
						let elemText = $('.create-game__comb tbody tr').eq(i).find('.t-subject').text()
						$('.create-game__comb tbody tr').eq(i).find(`option:selected[value="${elemText}"]`).length ? error += 1 : error = error
					}
					return error
				}
				// действия при клике на кнопку отправить
				$("body").on("click", ".submit", function () {
					// счётчик ошибок
					let warning = 0
					// проверка на количество и заполненость предметов
					if (checkFullness() > 0) {
						warning += 1
					}
					// проверка не бьёт ли предмет сам себя
					if (checkDisabled() > 0) {
						warning += 1
					}
					// проверка нет ли одинаовых выбранных предметов в select
					if (checkSelected(0) > 0) {
						warning += 1
					}
					if (warning === 0) {
						$('.create-game').addClass('opacity')
						$('.sides').css('z-index', 99)
						setTimeout(function () {
							$('.create-game').css('display', 'none')
							$('._container').removeClass('opacity')
						}, 500)
						let game = {}
						for (let i = 0; i < $('.create-game__comb tbody tr').length; i++) {
							let subjectComb = []
							let subjectImg = [$('.create-game__comb tbody tr').eq(i).find('.t-img input').val()]
							let subjectName = $('.create-game__comb tbody tr').eq(i).find('.t-subject').text()
							game[subjectName] = [subjectComb, subjectImg]
							for (let b = 0; b < $('.create-game__comb tbody tr').eq(i).find('select').length; b++) {
								subjectComb.push($('.create-game__comb tbody tr').eq(i).find('select').eq(b).children('option:selected').val())
							}
						}
						console.log(game)
						createGame(game)
					} else {
						alert('Проверьте форму на ошибки')
					}
				})
			} else {
				showGame()
			}
		})
	}
})
// объеты данных для игры 
let gameClassic = {
	'Камень': [['Ножницы'], ['http://127.0.0.1:5501/img/rock.png']],
	'Ножницы': [['Бумага'], ['http://127.0.0.1:5501/img/scissors.png']],
	'Бумага': [['Камень'], ['http://127.0.0.1:5501/img/paper.png']]
}
let gameSpok = {
	'Камень': [['Ножницы', 'Ящерица'], ['http://127.0.0.1:5501/img/rock.png']],
	'Ножницы': [['Бумага', 'Ящерица'], ['http://127.0.0.1:5501/img/scissors.png']],
	'Бумага': [['Камень', 'Спок'], ['http://127.0.0.1:5501/img/paper.png']],
	'Ящерица': [['Бумага', 'Спок'], ['http://127.0.0.1:5501/img/lizard.png']],
	'Спок': [['Камень', 'Ножницы'], ['http://127.0.0.1:5501/img/spok.png']]
}
function createGame(gameName) {
	// создание элементов из объекта 
	let combKeys = Object.keys(gameName)
	let combValue = Object.values(gameName)
	for (let i = 0; i < combKeys.length; i++) {
		let yourSideImg = document.createElement('img');
		yourSideImg.src = gameName[combKeys[i]][1]
		yourSideImg.alt = combKeys[i]
		document.querySelector('.your-side__img').appendChild(yourSideImg);
	}
	// случайная генерация предмета 
	function generateEnemySign() {
		let enemyClickSign = Math.round(-0.5 + Math.random() * combKeys.length);
		document.querySelector('.enemy-side__selected-sign img').src = gameName[combKeys[enemyClickSign]][1]
		document.querySelector('.enemy-side__selected-sign img').alt = combKeys[enemyClickSign]
	}
	// анимация появления и исчезновения предметов
	$('.your-side__img img').click(function () {
		let yourClickSign = this
		$('.your-side__img').addClass('opacity')
		$('.your-side__img').css('transform', 'scale(0)')
		setTimeout(function () {
			generateEnemySign()
			$('.your-side__img').css('display', 'none')
			$('.selected-sign').css('display', 'block')
			document.querySelector('.your-side__selected-sign img').src = yourClickSign.src
			document.querySelector('.your-side__selected-sign img').alt = yourClickSign.alt
			$('.selected-sign').css('transform', 'scale(1)')
			$('.selected-sign').removeClass('opacity')
			let enemySign = document.querySelector('.enemy-side__selected-sign img').alt
			let yourSign = document.querySelector('.your-side__selected-sign img').alt
			// определение победителя 
			if (enemySign != yourSign) {
				for (let i = 0; i < combKeys.length; i++) {
					for (let b = 0; b < combValue[i].length; b++) {
						if (enemySign == combKeys[i] && combValue[i][b].includes(yourSign)) {
							document.querySelector('.score__enemy').innerHTML = +document.querySelector('.score__enemy').innerHTML + 1
						} else if (yourSign == combKeys[i] && combValue[i][b].includes(enemySign)) {
							document.querySelector('.score__your').innerHTML = +document.querySelector('.score__your').innerHTML + 1
							break
						}
					}
				}
			}
			setTimeout(function () {
				$('.selected-sign').addClass('opacity')
				$('.selected-sign').css('transform', 'scale(0)')
				setTimeout(function () {
					$('.selected-sign').css('display', 'none')
					$('.your-side__img').css('display', 'block')
					$('.your-side__img').css('transform', 'scale(1)')
					$('.your-side__img').removeClass('opacity')
				}, 500)
			}, 1500)
		}, 500)
	})
}
