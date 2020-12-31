> 这是一个运行在cloudflare workers 上的博客程序,使用 cloudflare KV作为数据库,无其他依赖.
兼容静态博客的速度,以及动态博客的灵活性,方便搭建不折腾.
演示地址: [https://blog.gezhong.vip](https://blog.gezhong.vip "cf-blog演示站点")

### TG 讨论群: [@CloudflareBlog](https://t.me/cloudflareblog "")
# 主要特点
* 使用workers提供的KV作为数据库
* 使用cloudflare缓存html来降低KV的读写
* 所有html页面均为缓存,可达到静态博客的速度
* 使用KV作为数据库,可达到wordpress的灵活性
* 后台使用markdown语法,方便快捷
* 一键发布(页面重构+缓存清理)

# 承载能力
 * KV基本不存在瓶颈,因为使用了缓存,读写很少
 * 唯一瓶颈是 workers的日访问量10w,大约能承受2万IP /日
 * 文章数:1G存储空间,几万篇问题不大

# 部署步骤
  这里没有实时预览真难受,一系列坑会慢慢填到博客,敬请关注 [https://blog.gezhong.vip](https://blog.gezhong.vip "")

# 更新日志

> [持续更新地址https://blog.gezhong.vip/article/009000/update-log.html](https://blog.gezhong.vip/article/009000/update-log.html "更新日志")
  
## 最近更新(2020-12-31)
* 2020-12-31:加入sitemap.xml
* 2020-12-24:本次更新,主要针对seo和阅读次数,以及多项细节优化




### 前端演示:[https://blog.gezhong.vip](https://blog.gezhong.vip "演示站点")
![](https://s3.ax1x.com/2020/12/22/rrP81S.png)

### 后端演示:
![](https://s3.ax1x.com/2020/12/22/rrAWrD.png)

## 捐赠

如果你觉的本项目帮到你了，还请资持一下作者

* [捐赠](https://afdian.net/@zhaopp "爱发电")  
