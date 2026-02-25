<template>
	<view class="layout">
		<view class="navbar">
			<view class="statusBar" :style="{ height: getstatusBarHeight() + 'px' }"></view>
			<view class="titleBar" :style="{ height: getTitleBarHeight() + 'px' }">
				<view class="title">{{ title }}</view>
				<navigator class="search" url="/pages/search/search">
					<uni-icons class="icon" type="search" size="18"></uni-icons>
					<text class="text">搜索</text>
				</navigator>
			</view>
		</view>

		<view class="fill" :style="{ height: getNavBarHeight() + 'px' }"></view>
	</view>
</template>

<script setup>
import { ref } from 'vue';
import { getstatusBarHeight, getTitleBarHeight, getNavBarHeight } from '@/utils/system.js';

defineProps({
	title: {
		type: String,
		default: '壁纸'
	}
});
</script>

<style lang="scss" scoped>
.layout {
	.navbar {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		z-index: 10;
		background: linear-gradient(to bottom, transparent, #fff 400rpx), linear-gradient(to right, #336699, #814374);
		.statusBar {
		}
		.titleBar {
			display: flex;
			padding: 0 30rpx;
			align-items: center;
			.title {
				font-size: 22rpx;
				font-weight: 700;
				color: $text-font-color-1;
			}
			.search {
				width: 220rpx;
				height: 50rpx;
				border-radius: 60rpx;
				background: rgba(255, 255, 255, 0.4);
				border: 1px solid #ccc;
				margin-left: 30rpx;
				color: #000000;
				font-size: 28rpx;
				display: flex;
				align-items: center;
				.text {
					padding-left: 10rpx;
				}
				.icon {
					margin-left: 5rpx;
				}
			}
		}
	}
	.fill {
	}
}
</style>
