export function formatRelativeTime(timestamp) {
	// 统一转换成毫秒时间戳
	const targetTime = new Date(timestamp).getTime();
	const currentTime = Date.now();
	const diff = currentTime - targetTime;

	// 如果传入的是未来时间，按照需求可以根据实际情况处理，这里直接返回 null 或 "1分钟内"
	if (diff < 0) {
		return null;
	}

	// 定义时间常数（毫秒）
	const ONE_MINUTE = 60 * 1000;
	const ONE_HOUR = 60 * ONE_MINUTE;
	const ONE_DAY = 24 * ONE_HOUR;
	const ONE_MONTH = 30 * ONE_DAY; // 按 30天/月 估算，最适合常规的相对时间展示

	// 1分钟内
	if (diff <= ONE_MINUTE) {
		return "1分钟内";
	}
	// 1小时内：显示多少分钟前
	else if (diff <= ONE_HOUR) {
		const minutes = Math.floor(diff / ONE_MINUTE);
		return `${minutes}分钟前`;
	}
	// 1天内：显示多少小时前
	else if (diff <= ONE_DAY) {
		const hours = Math.floor(diff / ONE_HOUR);
		return `${hours}小时前`;
	}
	// 1个月内：显示多少天前
	else if (diff <= ONE_MONTH) {
		const days = Math.floor(diff / ONE_DAY);
		return `${days}天前`;
	}
	// 3个月内：显示多少个月前
	else if (diff <= 3 * ONE_MONTH) {
		const months = Math.floor(diff / ONE_MONTH);
		return `${months}个月前`;
	}
	// 超过三个月
	else {
		return '从前从前';
	}
}

export const gotoHome = () => {
	uni.showModal({
		title: '提示',
		content: "页面有误直接返回首页",
		showCancel: false,
		success: (res) => {
			if (res.confirm) {
				uni.reLaunch({
					url: '/pages/index/index'
				})
			}
		}
	})
}