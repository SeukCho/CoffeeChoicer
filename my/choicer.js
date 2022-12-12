let charNames = ['아메리카노', '에스프레소', '카페라떼', '카푸치노', '바닐라라떼', '헤이즐넛라떼', '카페모카', '카라멜마끼아또', '콜드브루', '콜드브루라떼', '에스프레소 마끼아또',
'초코라떼', '녹차라떼', '고구마라떼','곡물라떼','밀크티라떼','민트초코라떼','타로버블티','복숭아 아이스티', '스팀우유', '딸기주스', '딸기바나나주스','홍시주스','키위에이드',
'레몬에이드','자몽에이드','블루레몬에이드','딸기스무디','망고스무디','그린티스무디','유자스무디','오레오쉐이크','딸기오레오쉐이크','오레오쉐이크(휘핑)','딸기오레오쉐이크(휘핑)',
'요거트스무디','딸기요거트스무디','모카프라푸치노','카라멜프라푸치노','헤이즐넛 프라푸치노','유자차','오미자차','레몬꿀차','자몽차','캐모마일','페퍼민트','얼그레이','그린티',
'히비스커스', '루이보스']; //48개



$(document).ready(function(){
    $('#char')[0].scrollTop = 80;
});

function scrollElement(obj){
	console.log('scrollheight : ', obj.scrollHeight, 'clientheight : ', obj.clientHeight, 'obj.scrolltop : ', obj.scrollTop);
	if(obj.scrollHeight - obj.clientHeight <= obj.scrollTop + 80){
		obj.scrollTop = 90;
	}
	else {
		obj.scrollBy(0, 10);
	}
}

function getRandomInt(n) {
	return Math.floor(Math.random() * 100000000) % n;
}

function startAll(){
    let obj = $("#char")[0];
    scrollElement(obj);
}



document.getElementById('startAll').addEventListener('click', function(){startAll();});