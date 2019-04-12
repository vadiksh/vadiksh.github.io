<!-- Load Bludit Plugins: Page Begin -->
<?php Theme::plugins('pageBegin'); ?>

<pre>
<?php  
    function shorter($text, $len=120){
        
        $textLength = strlen($text);
        
        if($len>=$textLength){
            return $text;
        } else {
            return substr($text, 0, $len)."...";
        }
    }
    $pageNumber = 1; // First page number
    $amountOfItems = -1; // Latest 5 items
    $onlyPublished = true;
    $listOfPages = $pages->getList($pageNumber, $amountOfItems, $onlyPublished);
   
?>
</pre>
<?php $recentPage = new Page($listOfPages[0]); ?>
<section id="main-blog">
    <div class="container">
        <a href="<?php echo $recentPage->permalink() ?>">
            <div class="main-blog wd-90">
                <div class="tag-list">
                    <?php foreach($recentPage->tags(true) as $tag): ?>
                        <span class="post-tag tag-grey text-uppercase"><?php echo $tag ?></span>                  
                    <?php endforeach ?>
                </div>
                <h1 class="main-title title"><?php echo $recentPage->title(); ?></h1>
                <?php if($recentPage->coverImage()): ?>
                <div class="cover-image"><img src="<?php echo $recentPage->coverImage(); ?>" width="100%" alt="imgage"></div>              
                <?php endif ?>
                <p class="short-content"><?php echo ($recentPage->description()? $recentPage->description() : shorter($recentPage->content(), 400)); ?></p>
                <div class="author">
                    <img src="<?php echo ($recentPage->user('profilePicture')?$recentPage->user('profilePicture'):Theme::src('img/noavatar.png')) ?>" alt="avatar" class="author-avatar img-circle">
                    <p class="author-info">
                        <span class="author-name">by <b><?php echo $recentPage->user('nickname'); ?></b></span>
                        <span class="date"><?php echo $recentPage->readingTime(); ?></span>  
                    </p>
                    <p class="go-blog"><a href="<?php echo $recentPage->permalink(); ?>">Read full story</a></p>                
                </div>         
            </div>
        </a>
    </div>    
</section>

<section id="blog-list">
    <div class="container">
        
        <div class="row">         
                <div class="col-md-6 col-sm-12  col-xs-12 bwap">   
            <?php $count = count($contents); 
            
            foreach($listOfPages as $index => $key): ?>   
                <?php if($index==0) continue; ?> 
                <?php $page = new Page($key); ?>

                <?php if($index % 2 == 1 && $index != 1): ?>
                
                <div class="col-md-6 col-sm-12  col-xs-12 bwap">
                <?php endif ?>
                <a href="<?php echo $page->permalink(); ?>">
                    <div class="card-blog <?php echo($page->coverImage()? '' : 'card-inner'); ?>">
                        <div class="card_cover_image">
                            <img src="<?php echo ($page->coverImage()?$page->coverImage():Theme::src('img/noimage.jpg')) ?>" alt="cover">
                           
                        </div>
                        <div class="card-detail">
                            <div class="tag-list">
                                <?php foreach($page->tags(true) as $tag): ?>
                                    <span class="post-tag text-uppercase <?php echo ($page->coverImage()? 'tag-grey': ''); ?>"><?php echo $tag ?></span>      
                                <?php endforeach ?>
                            </div>
                            <h3 class="card-title title"><?php echo $page->title(); ?></h3>
                            <p class="card-content"><?php echo ($page->description()? shorter($page->description()) : shorter(Text::removeHTMLTags($page->content()))); ?></p>
                            <div class="author">
                                <img src="<?php echo ($page->user('profilePicture')?$page->user('profilePicture'):Theme::src('img/noavatar.png')) ?>" alt="avatar" class="author-avatar img-circle">
                                <p class="author-info">
                                    <span class="author-name">by <b><?php echo $page->user('nickname'); ?></b></span>
                                    <span class="date"><?php echo $page->readingTime(); ?></span>  
                                </p>                                
                            </div>
                        </div>        
                    </div>  
                </a>
                                 
                <?php if($index == $count-1 || $index % 2 == 0): ?>                
                </div>
          
                <?php endif ?>
            <?php endforeach ?>            
        </div>
      
    </div>
</section>


<section id="demo">
    <div class="container text-center">
        <h2 class="text-center question">Ready to start with data-driven<br/> talent acquisition?</h2> 
        <a class="btn_circle btn" href="https://adwayads.typeform.com/to/LXRknK" target="_blank">REQUEST DEMO</a>      
    </div>
</section>
<!-- Load Bludit Plugins: Page End -->
<?php Theme::plugins('pageEnd'); ?>