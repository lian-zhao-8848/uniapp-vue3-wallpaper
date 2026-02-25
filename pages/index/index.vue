<template>
	<view class="homeLayout pageBg">
		<custom-nav-bar title="推荐"></custom-nav-bar>
		<view class="banner">
			<swiper circular indicator-dots indicator-color="rgba(255,255,255,0.5)" indicator-active-color="#fff" autoplay>
				<swiper-item v-for="item in bannerList" :key="item._id">
					<navigator :url="`/pages/classlist/classlist?${item.url}`" class="link">
						<image :src="item.picurl" mode="aspectFill"></image>
					</navigator>
				</swiper-item>
			</swiper>
		</view>

		<view class="notice">
			<view class="left">
				<uni-icons type="sound-filled" size="20"></uni-icons>
				<text class="text">公告</text>
			</view>
			<view class="center">
				<swiper vertical circular autoplay interval="1500" duration="300">
					<swiper-item v-for="item in noticeList" :key="item._id">
						<navigator url="/pages/notice/detail">{{ item.title }}</navigator>
					</swiper-item>
				</swiper>
			</view>
			<view class="right">
				<uni-icons type="right" size="16"></uni-icons>
			</view>
		</view>

		<view class="select">
			<common-title>
				<template #name>每日推荐</template>
				<template #custom>
					<view class="date">
						<uni-icons type="calendar-filled" size="18"></uni-icons>
						<view class="text">
							<uni-dateformat :date="Date.now()" format="MM月dd日"></uni-dateformat>
						</view>
					</view>
				</template>
			</common-title>
			<view class="content">
				<scroll-view scroll-x="true">
					<view class="box" v-for="item in randomList" :key="item._id" @click="goPreview(item._id)">
						<image :src="item.smallPicurl" mode="aspectFill"></image>
					</view>
				</scroll-view>
			</view>
		</view>

		<view class="theme">
			<common-title>
				<template #name>专题精选</template>
				<template #custom>
					<navigator url="" class="more">More+</navigator>
				</template>
			</common-title>

			<view class="content">
				<theme-item v-for="item in classifyList" :key="item._id" :item="item"></theme-item>
				<theme-item :isMore="true"></theme-item>
			</view>
		</view>
	</view>
</template>

<script setup>
import { ref } from 'vue';
import { onShareAppMessage, onShareTimeline } from '@dcloudio/uni-app';
import { apiGetBanner, apiGetDayRandom, apiGetNotice, apiGetClassify } from '@/api/apis.js';
import { color } from 'echarts';
//轮播banner图
const bannerList = ref([]);
const getBanner = async () => {
	let res = await apiGetBanner();
	bannerList.value = res.data;
};
getBanner();
//随机壁纸
const randomList = ref([]);
const getDayRandom = async () => {
	let res = await apiGetDayRandom();
	randomList.value = res.data;
};
getDayRandom();
//公告样式栏
const noticeList = ref([]);
const getNotice = async () => {
	let res = await apiGetNotice({ select: true });
	noticeList.value = res.data;
};
getNotice();
//专题精选
const classifyList = ref([]);
const getClassify = async () => {
	let res = await apiGetClassify({
		select: true
	});
	classifyList.value = res.data;
};
getClassify();

const goPreview = (id) => {
	uni.setStorageSync('storageClassList', randomList.value);
	uni.navigateTo({
		url: `/pages/preview/preview?id=${id}`
	});
};

//分享给好友
onShareAppMessage((e) => {
	return {
		title: '翔翔壁纸',
		path: '/pages/classify/classify'
	};
});

//分享到朋友圈
onShareTimeline(() => {
	return {
		title: '翔翔壁纸'
	};
});
</script>

<style lang="scss" scoped>
.homeLayout {
	.banner {
		width: 750rpx;
		padding: 30rpx 0;
		swiper {
			width: 750rpx;
			height: 340rpx;
			&-item {
				width: 100%;
				height: 100%;
				padding: 0 30rpx;
				.link {
					width: 100%;
					height: 100%;
					image {
						width: 100%;
						height: 100%;
						border-radius: 10rpx;
					}
				}
			}
		}
	}
	.notice {
		width: 690rpx;
		height: 80rpx;
		line-height: 80rpx;
		background-color: #ccc;
		margin: 0 auto;
		display: flex;
		border-radius: 80rpx;
		.left {
			width: 140rpx;
			display: flex;
			align-items: center;
			justify-content: center;
			:deep(.uni-icons) {
				color: $brand-theme-color !important;
			}
			.text {
				color: $brand-theme-color;
				font-weight: 600;
				font-size: 28rpx;
			}
		}
		.center {
			flex: 1;
			swiper {
				height: 100%;
				&-item {
					height: 100%;
					font-size: 30rpx;
					color: #666;
					overflow: hidden;
					white-space: nowrap;
					text-overflow: ellipsis;
				}
			}
		}
		.right {
			width: 70rpx;
			display: flex;
			justify-content: center;
			align-items: center;
			color: $text-font-color-2;
		}
	}
	.select {
		padding-top: 50rpx;
		.date {
			color: $brand-theme-color;
			display: flex;
			align-items: center;
			:deep(.uni-icons) {
				color: $brand-theme-color !important;
			}

			.text {
				margin-right: 5rpx;
			}
		}
		.content {
			width: 720rpx;
			margin: 30rpx 0 0 30rpx;
			scroll-view {
				white-space: nowrap;
				.box {
					width: 200rpx;
					height: 430rpx;
					display: inline-block;
					margin-right: 15rpx;
					image {
						width: 100%;
						height: 100%;
						border-radius: 10rpx;
					}
				}
				.box:last-child {
					margin-right: 30rpx;
				}
			}
		}
	}
	.theme {
		padding: 50rpx 0;
		.more {
			font-size: 32rpx;
			color: #666;
		}
		.content {
			margin-top: 30rpx;
			padding: 0 30rpx;
			display: grid;
			gap: 15rpx;
			grid-template-columns: repeat(3, 1fr);
		}
	}
}
</style>
