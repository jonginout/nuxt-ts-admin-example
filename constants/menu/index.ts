const MENU = [
	{
		title: '관리',
		icon: 'setting',
		children: [
			{
				title: '차량관리',
				link: '/car'
			},
			{
				title: '존관리',
				link: '/zone'
			},
			{
				title: '사고관리',
				link: '/accident'
			}
		]
	},
	{
		title: '프로모션',
		icon: 'location',
		children: [
			{
				title: '쿠폰',
				link: '/coupon'
			},
			{
				title: '크레딧',
				link: '/credit',
				children: [
					{
						title: '일괄지급',
						link: '/credit/all'
					},
					{
						title: '단건지급',
						link: '/credit/one'
					}
				]
			},
		]
	},
]

export default MENU
