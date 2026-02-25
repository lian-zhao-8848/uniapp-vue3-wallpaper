<template>
	<view class="noticeLayou">
		<view class="title">
			<view class="tag">
				<uni-tag text="置顶" :inverted="true" type="error"></uni-tag>
			</view>
			<view class="font">欢迎加我微信</view>
			<view></view>
		</view>

		<view class="info">
			<view class="item">连招</view>
			<view class="item">
				<uni-dateformat :date="Date.now()" format="yyyy/MM/dd hh:mm:ss"></uni-dateformat>
			</view>
		</view>

		<view class="content">
			<image src="/static/images/phone.jpg" mode="widthFix"></image>
			<view class="text">
				<text>扫码加我微信，就可以加我微信</text>
			</view>
		</view>

		<view class="count">阅读 5588</view>
	</view>
</template>

<script setup></script>

<style lang="scss" scoped>
.noticeLayou {
	.title {
		display: flex;
		align-items: center;
		justify-content: space-around;
		padding: 30rpx;
		.font {
			font-size: 45rpx;
			font-weight: 700;
		}
	}
	.info {
		display: flex;
		padding: 30rpx;
		.item {
			margin-right: 20rpx;
			color: $text-font-color-3;
			font-size: 25rpx;
		}
	}
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		image {
			width: 60%;
		}
		.text {
			align-self: flex-start;
			padding-left: 30rpx;
			font-size: 30rpx;
			color: $text-font-color-1;
		}
	}
	.count {
		padding: 30rpx;
		font-size: 20rpx;
		color: $text-font-color-3;
	}
}
</style>
