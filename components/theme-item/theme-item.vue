<template>
	<view class="themeItem">
		<navigator :url="`/pages/classlist/classlist?id=${item._id}&name=${item.name}`" class="box" v-if="!isMore">
			<image class="pic" :src="item.picurl" mode="aspectFill"></image>
			<view class="mask">{{ item.name }}</view>
			<view class="tab">{{ formatRelativeTime(item.updateTime) }}前更新</view>
		</navigator>

		<navigator open-type="reLaunch" url="/pages/classify/classify" class="box more" v-else>
			<image class="pic" src="/common/images/more.jpg" mode="aspectFill"></image>
			<view class="mask">
				<uni-icons color="#fff" type="more-filled" size="34"></uni-icons>
				<view class="text">更多</view>
			</view>
		</navigator>
	</view>
</template>

<script setup>
import { formatRelativeTime } from '@/utils/common.js';
defineProps({
	isMore: {
		type: Boolean,
		default: false
	},
	item: {
		type: Object,
		default() {
			return {
				name: '默认名字',
				picurl: '/common/images/classify1.jpg',
				updateTime: Date.now() - 1000 * 60 * 60 * 5
			};
		}
	}
});
</script>

<style lang="scss" scoped>
.themeItem {
	.box {
		height: 340rpx;
		border-radius: 10rpx;
		overflow: hidden;
		position: relative;
		.pic {
			width: 100%;
			height: 100%;
			position: absolute;
		}
		.mask {
			position: absolute;
			width: 100%;
			height: 68rpx;
			line-height: 68rpx;
			background-color: rgba(0, 0, 0, 0.2);
			color: #fff;
			bottom: 0;
			text-align: center;
			backdrop-filter: blur(20rpx);
			font-weight: 600;
			font-size: 30rpx;
		}
		.tab {
			position: absolute;
			left: 0;
			top: 0;
			background-color: rgba(250, 129, 90, 0.7);
			backdrop-filter: blur(20rpx);
			color: #fff;
			font-size: 22rpx;
			padding: 6rpx 14rpx;
			border-radius: 0 0 20rpx 0;
			transform: scale(0.8);
			transform-origin: left top;
		}
	}
	.box.more {
		.mask {
			width: 100%;
			height: 100%;
			backdrop-filter: blur(20rpx);
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
		}
		.text {
			font-size: 28rpx;
			margin-top: -15rpx;
		}
	}
}
</style>
