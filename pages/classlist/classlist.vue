<template>
	<view class="classList">
		<view class="content">
			<template v-if="loading">
				<view class="item" v-for="item in 12" :key="item">
					<uv-skeletons :loading="loading" :skeleton="skeleton"></uv-skeletons>
				</view>
			</template>

			<template v-else>
				<navigator :url="`/pages/preview/preview?id=${item._id}`" class="item" v-for="item in classList" :key="item._id">
					<image :src="item.smallPicurl" mode="aspectFill"></image>
				</navigator>
			</template>
		</view>
		<view class="load-more-box" v-if="!loading"><uni-load-more :status="loadStatus" color="#007AFF" :contentText="customText" /></view>
	</view>
</template>

<script setup>
import { ref } from 'vue';
import { onLoad, onUnload, onReachBottom, onShareAppMessage, onShareTimeline } from '@dcloudio/uni-app';
import { gotoHome } from '@/utils/common.js';
import { apiGetclassList, apiGetHistoryList } from '@/api/apis.js';
const classList = ref([]);
const noData = ref(false);

//修改文字状态
const customText = ref({
	contentrefresh: '冲锋======================',
	contentnomore: '已经被榨干了TT'
});
//定义loading状态
const loading = ref(true);
//触底加载状态
const loadStatus = ref('more');
const skeleton = ref([
	{
		type: 'line',
		num: 1, // 因为外层已经循环了 12 个 item，所以这里每个 item 只需要 1 个占位块
		style: {
			width: '100%',
			height: '440rpx', // 【核心】高度必须和下方 CSS 中 .item 的高度一致，防止切换时页面抖动
			borderRadius: '8rpx' // 可选：加一点圆角让骨架屏更好看
		}
	}
]);
const queryParams = {
	pageNum: 1,
	pageSize: 12
};
//注意生命周期，加载顺序问题
//修改导航标题
let pageName;
onLoad((e) => {
	let { id = null, name = null, type = null } = e;
	// if (!id) gotoHome();
	if (type) queryParams.type = type;
	if (id) queryParams.classid = id;
	pageName = name;
	uni.setNavigationBarTitle({
		title: pageName
	});
	//这里执行才是正确数据
	getClassList();
});
//触底加载更多
onReachBottom(() => {
	if (noData.value) return;
	if (loadStatus.value === 'loading') return;
	queryParams.pageNum++;
	getClassList();
});
//获取分类列表的网络数据
const getClassList = async () => {
	if (!loading.value) {
		loadStatus.value = 'loading';
	}
	try {
		let res;
		if (queryParams.classid) res = await apiGetclassList(queryParams);
		if (queryParams.type) res = await apiGetHistoryList(queryParams);

		classList.value = [...classList.value, ...res.data];
		uni.setStorageSync('storageClassList', classList.value);
		if (queryParams.pageSize > res.data.length) {
			noData.value = true;
			loadStatus.value = 'no-more';
		} else {
			loadStatus.value = 'more';
		}
	} finally {
		//关闭骨架屏效果
		loading.value = false;
	}
};

//分享给好友
onShareAppMessage((e) => {
	return {
		title: '翔翔壁纸',
		path: `/pages/classlist/classlist?id=${queryParams.classid}&name=${pageName}`
	};
});

//分享到朋友圈
onShareTimeline(() => {
	return {
		title: '翔翔壁纸'
	};
});

//离开页面清除缓存
onUnload(() => {
	uni.removeStorageSync('storageClassList');
});
</script>

<style lang="scss" scoped>
.classList {
	.content {
		display: grid;
		gap: 5rpx;
		grid-template-columns: repeat(3, 1fr);
		padding: 5rpx;
		.item {
			height: 440rpx;
			image {
				width: 100%;
				height: 100%;
				display: block;
			}
		}
	}
	.load-more-box {
		padding-top: 30rpx;
		padding-bottom: 50rpx;
	}
}
</style>
