<template>
	<view class="preview" v-if="currentInfo">
		<swiper circular :current="currentIndex" @change="swpierChange">
			<swiper-item v-for="(item, index) in classList" :key="item._id">
				<image v-if="readImgs.includes(index)" @click="maskChange" :src="item.picurl" mode="aspectFill"></image>
			</swiper-item>
		</swiper>
		<view class="mask" v-if="maskState">
			<view @click="goBack" class="goBack" :style="{ top: getstatusBarHeight() + 'px' }">
				<uni-icons color="#fff" type="undo-filled" size="20"></uni-icons>
			</view>
			<view class="count">{{ currentIndex + 1 }} / {{ classList.length }}</view>
			<view class="time">
				<uni-dateformat :date="new Date()" format="hh:mm"></uni-dateformat>
			</view>
			<view class="date">
				<uni-dateformat :date="new Date()" format="MM月dd日"></uni-dateformat>
			</view>
			<view class="footer">
				<view class="box" @click="clickInfo">
					<uni-icons type="info" size="28"></uni-icons>
					<view class="text">信息</view>
				</view>
				<view class="box" @click="clickScore">
					<uni-icons type="star" size="28"></uni-icons>
					<view class="text">{{ currentInfo?.score || 0 }}分</view>
				</view>
				<view class="box" @click="clickDownLoad">
					<uni-icons type="download" size="28"></uni-icons>
					<view class="text">下载</view>
				</view>
			</view>
		</view>

		<uni-popup ref="infoPopup" type="bottom">
			<view class="infoPopup">
				<view class="popHeader">
					<!-- 设置空盒子，布局分配效果 -->
					<view></view>
					<view class="title">壁纸信息</view>
					<view class="close" @click="clickInfoClose">
						<uni-icons type="closeempty" size="18" color="#999"></uni-icons>
					</view>
				</view>
				<scroll-view scroll-y="true">
					<view class="content">
						<view class="row">
							<view class="label">壁纸ID：</view>
							<text class="value">{{ currentInfo._id }}</text>
						</view>
						<view class="row">
							<view class="label">分类：</view>
							<text class="value light">明星美女</text>
						</view>
						<view class="row">
							<view class="label">发布者：</view>
							<text class="value">{{ currentInfo.nickname }}</text>
						</view>
						<view class="row">
							<view class="label">评分：</view>
							<view class="value routBox">
								<uni-rate readonly touchable :value="currentInfo.score" size="16" />
								<text class="score">{{ currentInfo.score }}</text>
							</view>
						</view>
						<view class="row">
							<view class="label">摘要：</view>
							<text class="value">{{ currentInfo.description }}</text>
						</view>
						<view class="row">
							<view class="label">标签：</view>
							<view class="value tabs">
								<view class="tab" v-for="item in currentInfo.tabs" :key="item">{{ item }}</view>
							</view>
						</view>
						<view class="copyright">
							声明：本图片来自用户投稿，非商业使用，用于免费学习交流，如侵犯了您的合法权益，你可以投稿到壁纸引擎进行举报，邮箱1827358601@qq.com，我将会删除侵权壁纸，维护您的合法权益。
						</view>
					</view>
				</scroll-view>
			</view>
		</uni-popup>

		<uni-popup ref="scorePopup" :is-mask-click="false">
			<view class="scorePopup">
				<view class="popHeader">
					<view></view>
					<view class="title">{{ isScore ? '评分过了' : '壁纸评分' }}</view>
					<view class="close" @click="clickScoreClose">
						<uni-icons type="closeempty" color="#999"></uni-icons>
					</view>
				</view>
				<view class="content">
					<uni-rate v-model="userScore" allowHalf :disabled="isScore" />
					<text class="text">{{ userScore }}分</text>
				</view>
				<view class="footer">
					<button @click="submitScore" :disabled="!userScore || isScore" type="default" size="mini" plain>确认评分</button>
				</view>
			</view>
		</uni-popup>
	</view>
</template>

<script setup>
import { apiGetSetupScore, apiWriteDloadWall, apiDetailWall } from '@/api/apis.js';
import { getstatusBarHeight } from '@/utils/system.js';
import { ref } from 'vue';
import { onLoad, onShareAppMessage } from '@dcloudio/uni-app';
//判断是否有评分
const isScore = ref(false);
const currentId = ref(null);
const currentIndex = ref(0);
//信息页面的详情
const currentInfo = ref({
	_id: '',
	nickname: '',
	score: 0,
	description: '',
	tabs: [],
	picurl: '',
	userScore: 0
});
//定义空数组判断是否看过这张图
const readImgs = ref([]);
//滑动修改索引事件
const swpierChange = (e) => {
	currentIndex.value = e.detail.current;
	currentInfo.value = classList.value[currentIndex.value];
	funReadimg();
};
//抽取出这个函数
const funReadimg = () => {
	readImgs.value.push(
		currentIndex.value <= 0 ? classList.value.length - 1 : currentIndex.value - 1,
		currentIndex.value,
		currentIndex.value >= classList.value.length - 1 ? 0 : currentIndex.value + 1
	);
	readImgs.value = [...new Set(readImgs.value)];
};
//接收传递的_id值
onLoad(async (e) => {
	currentId.value = e.id;
	if (e.type === 'share') {
		let res = await apiDetailWall({ id: currentId.value });
		classList.value = res.data.map((item) => {
			return {
				...item,
				picurl: item.smallPicurl.replace('_small.webp', '.jpg')
			};
		});
	}
	currentIndex.value = classList.value.findIndex((item) => item._id === currentId.value);
	currentInfo.value = classList.value[currentIndex.value];
	funReadimg();
});
//遮罩层状态
const maskState = ref(true);
const maskChange = () => {
	maskState.value = !maskState.value;
};
//弹出层
const infoPopup = ref(null);
const clickInfo = () => {
	infoPopup.value.open();
};
//关闭信息弹框
const clickInfoClose = () => {
	infoPopup.value.close();
	userScore.value = 0;
};
//评分弹框
const userScore = ref(0);
const scorePopup = ref(null);
//开启评分弹框
const clickScore = () => {
	if (currentInfo.value.userScore) {
		isScore.value = true;
		userScore.value = currentInfo.value.userScore;
	}
	scorePopup.value.open();
};
//关闭评分弹框
const clickScoreClose = () => {
	isScore.value = false;
	scorePopup.value.close();
};
//确认评分
const submitScore = async () => {
	uni.showLoading({
		title: '正在飞速加载'
	});
	let { classid, _id: wallId } = currentInfo.value;
	let res = await apiGetSetupScore({
		classid,
		wallId,
		userScore: userScore.value
	});
	uni.hideLoading();
	if (res.errCode === 0) {
		uni.showToast({
			title: '评分成功',
			icon: 'none'
		});
		classList.value[currentIndex.value].userScore = userScore.value;
		uni.setStorageSync('storageClassList', classList.value);
		clickScoreClose();
	}
};
//点击返回
const goBack = () => {
	uni.navigateBack({
		success: () => {},
		fail: (err) => {
			uni.reLaunch({
				url: '/pages/index/index'
			});
		}
	});
};
const classList = ref([]);
//获取本地存储的数据
const storageClassList = uni.getStorageSync('storageClassList') || [];
classList.value = storageClassList.map((item) => {
	return {
		...item,
		picurl: item.smallPicurl.replace('_small.webp', '.jpg')
	};
});

//下载到系统相册
const clickDownLoad = async () => {
	// #ifdef H5
	uni.showModal({
		content: '单击右键即可保存壁纸',
		showCancel: false
	});
	// #endif

	// #ifndef H5
	try {
		uni.showLoading({
			title: '正在跳转下载....',
			mask: true
		});
		let { classid, _id: wallId } = currentInfo.value;
		let res = await apiWriteDloadWall({
			classid,
			wallId
		});
		if (res.errCode !== 0) throw res;

		uni.getImageInfo({
			src: currentInfo.value.picurl,
			success: (res) => {
				uni.saveImageToPhotosAlbum({
					filePath: res.path,
					success: (res) => {
						console.log(res);
					},
					fail: (err) => {
						if (err.errMsg == 'saveImageToPhotosAlbum:fail cancel') {
							uni.showToast({
								title: '保存失败，需要您重新下载',
								icon: 'none'
							});
							return;
						}
						uni.showModal({
							title: '提示',
							content: '需要授权保存相册',
							success: (res) => {
								if (res.confirm) {
									uni.openSetting({
										success: (setting) => {
											if (setting.authSetting['scope.writePhotosAlbum']) {
												uni.showToast({
													title: '获取授权成功',
													icon: 'none'
												});
											} else {
												uni.showToast({
													title: '请重新获取授权',
													icon: 'none'
												});
											}
										}
									});
								}
							}
						});
					},
					complete: () => {
						uni.hideLoading();
					}
				});
			}
		});
	} catch (err) {
		uni.hideLoading();
	}
	// #endif
};

//分享给好友
onShareAppMessage((e) => {
	return {
		title: '翔翔壁纸',
		path: `/pages/preview/preview?id=${currentId.value}&type=share`
	};
});
</script>

<style lang="scss" scoped>
.preview {
	width: 100%;
	height: 100vh;
	swiper {
		width: 100%;
		height: 100%;
		position: relative;
		image {
			width: 100%;
			height: 100%;
		}
	}
	.mask {
		& > view {
			position: absolute;
			left: 50%;
			transform: translateX(-50%);
			width: fit-content;
			color: #fff;
		}
		.goBack {
			left: 30rpx;
			top: 0;
			width: 38px;
			height: 38px;
			background: rgba(0, 0, 0, 0.5);
			margin-left: 30rpx;
			border-radius: 100px;
			backdrop-filter: blur(10rpx);
			border: 1rpx solid rgba(255, 255, 255, 0.3);
			display: flex;
			justify-content: center;
			align-items: center;
		}
		.count {
			top: 10vh;
			background-color: rgba(0, 0, 0, 0.3);
			//模糊效果
			backdrop-filter: blur(10rpx);
			font-size: 28rpx;
			border-radius: 40rpx;
			padding: 8rpx 28rpx;
		}
		.time {
			font-size: 140rpx;
			top: calc(10vh + 80rpx);
			line-height: 1em;
			text-shadow: 0 4rpx rgba(0, 0, 0, 0.3);
		}
		.date {
			font-size: 34rpx;
			top: calc(10vh + 230rpx);
			text-shadow: 0 2rpx rgba(0, 0, 0, 0.3);
		}
		.footer {
			bottom: 10vh;
			background: rgba(255, 255, 255, 0.8);
			width: 65vw;
			height: 120rpx;
			border-radius: 120rpx;
			color: black;
			display: flex;
			align-items: center;
			justify-content: space-around;
			box-shadow: 0 2rpx 0 rgba(0, 0, 0, 0.1);
			.box {
				display: flex;
				flex-direction: column;
				justify-content: center;
				align-items: center;
				padding: 2rpx 12rpx;
				.text {
					font-size: 26rpx;
					color: $text-font-color-2;
				}
			}
		}
	}

	.popHeader {
		display: flex;
		justify-content: space-between;
		align-items: center;
		.title {
			color: $text-font-color-2;
			font-size: 26rpx;
		}
		.close {
			padding: 6rpx;
		}
	}
	.infoPopup {
		background-color: #fff;
		overflow: hidden;
		border-radius: 30rpx 30rpx 0 0;
		padding: 30rpx;

		scroll-view {
			max-height: 60vh;
			.content {
				.row {
					display: flex;
					font-size: 32rpx;
					line-height: 1.7em;
					padding: 16rpx 0;
					.label {
						color: $text-font-color-3;
						width: 140rpx;
						text-align: right;
						font-size: 30rpx;
					}
					.value {
						flex: 1;
						width: 0;
					}
					.routBox {
						display: flex;
						align-items: center;
						.score {
							font-size: 26rpx;
							color: $text-font-color-3;
							margin-left: 20rpx;
						}
					}
					.tabs {
						display: flex;
						flex-wrap: wrap;
						.tab {
							border: 1px solid $brand-theme-color;
							border-radius: 40rpx;
							color: $brand-theme-color;
							line-height: 1em;
							font-size: 22rpx;
							padding: 10rpx 30rpx;
							margin: 0 10rpx 10rpx 0;
						}
					}
					.light {
						color: $brand-theme-color;
					}
				}
				.copyright {
					font-size: 28rpx;
					padding: 20rpx;
					background: #f6f6f6;
					color: #666;
					border-radius: 10rpx;
					margin: 20rpx 0;
					line-height: 1.6em;
				}
			}
		}
	}

	.scorePopup {
		background-color: #fff;
		padding: 30rpx;
		width: 70vw;
		border-radius: 30rpx;
		.content {
			padding: 30rpx 0;
			display: flex;
			justify-content: center;
			align-items: center;
			.text {
				color: #ffca3e;
				padding-left: 10rpx;
				width: 80rpx;
				line-height: 1em;
				text-align: right;
			}
		}
		.footer {
			padding: 10rpx 0;
			text-align: center;
		}
	}
}
</style>
