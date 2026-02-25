<template>
	<view class="userLayout pageBg" v-if="userinfo">
		<view :style="{ height: getNavBarHeight() + 'px' }"></view>
		<view class="userInfo">
			<view class="avator">
				<image src="/static/images/head.jpg" mode="aspectFill"></image>
			</view>
			<view class="ip">{{ userinfo.IP }}</view>
			<view class="adress">来自于：{{ userinfo.address.province || '中国' }}</view>
		</view>

		<view class="section">
			<view class="list">
				<navigator class="row" url="/pages/classlist/classlist?name=我的下载&type=download">
					<view class="left">
						<uni-icons type="cloud-download-filled" size="20"></uni-icons>
						<view class="text">我的下载</view>
					</view>
					<view class="right">
						<view class="text">{{ userinfo.address.downloadSize }}</view>
						<uni-icons color="#aaa" type="right" size="15"></uni-icons>
					</view>
				</navigator>

				<navigator class="row" url="/pages/classlist/classlist?name=我的评分&type=score">
					<view class="left">
						<uni-icons type="star-filled" size="20"></uni-icons>
						<view class="text">我的评分</view>
					</view>
					<view class="right">
						<view class="text">{{ userinfo.address.scoreSize }}</view>
						<uni-icons color="#aaa" type="right" size="15"></uni-icons>
					</view>
				</navigator>

				<view class="row">
					<view class="left">
						<uni-icons type="chatboxes-filled" size="20"></uni-icons>
						<view class="text">联系客服</view>
					</view>
					<view class="right">
						<uni-icons color="#aaa" type="right" size="15"></uni-icons>
					</view>
					<!-- #ifdef MP-WEIXIN -->
					<button open-type="contact">联系客服</button>
					<!-- #endif -->

					<!-- #ifdef H5 -->
					<button @click="clickContact">拨打电话</button>
					<!-- #endif -->
				</view>
			</view>
		</view>

		<view class="section">
			<view class="list">
				<view class="row">
					<view class="left">
						<uni-icons type="notification-filled" size="20"></uni-icons>
						<view class="text">订阅更新</view>
					</view>
					<view class="right">
						<uni-icons color="#aaa" type="right" size="15"></uni-icons>
					</view>
				</view>

				<view class="row">
					<view class="left">
						<uni-icons type="flag-filled" size="20"></uni-icons>
						<view class="text">常见问题</view>
					</view>
					<view class="right">
						<uni-icons color="#aaa" type="right" size="15"></uni-icons>
					</view>
				</view>
			</view>
		</view>
	</view>
	<view v-else class="loadingLayout">
		<view :style="{ height: getNavBarHeight() + 'px' }"></view>
		<uni-load-more status="loading"></uni-load-more>
	</view>
</template>

<script setup>
import { getNavBarHeight } from '@/utils/system.js';
import { apiUserInfo } from '@/api/apis.js';
import { ref } from 'vue';
const userinfo = ref(null);
const getUserInfo = async () => {
	let res = await apiUserInfo();
	userinfo.value = res.data;
	console.log(res.data);
};
getUserInfo();
const clickContact = () => {
	uni.makePhoneCall({
		phoneNumber: '114'
	});
};
</script>

<style lang="scss" scoped>
.userLayout {
	.userInfo {
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;
		padding: 50rpx 0;
		.avator {
			width: 160rpx;
			height: 160rpx;
			border-radius: 50%;
			overflow: hidden;
			image {
				width: 100%;
				height: 100%;
			}
		}
		.ip {
			font-size: 44rpx;
			padding: 20rpx 0 5rpx 0;
		}
		.adress {
			font-size: 28rxp;
			color: #aaa;
		}
	}
	.section {
		margin: 50rpx 30rpx;
		border: 1rpx solid #eee;
		border-radius: 10rpx;
		box-shadow: 0 0 30rpx rgba(0, 0, 0, 0.13);
	}
	.list {
		.row {
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding: 0 30rpx;
			height: 100rpx;
			border-bottom: 1px solid #eee;
			position: relative;
			background-color: #fff;
			button {
				position: absolute;
				left: 0;
				top: 0;
				height: 100rpx;
				width: 100%;
				opacity: 0;
			}
			&:last-child {
				border-bottom: 0;
			}
			.left {
				display: flex;
				align-items: center;
				:deep(.uni-icons) {
					color: $brand-theme-color !important;
				}
				.text {
					margin-left: 20rpx;
					color: #666;
				}
			}
			.right {
				display: flex;
				align-items: center;
				.text {
					font-size: 28rpx;
					color: #aaa;
				}
			}
		}
	}
}
</style>
