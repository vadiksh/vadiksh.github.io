<!-- Load Bludit Plugins: Page Begin -->
<?php Theme::plugins('pageBegin'); ?>

<section id="blog">
    <div class="container">
        <div class="blog-head-wrapper">
            <div class="blog-head"  style="background:url('<?php echo ($page->coverImage()?$page->coverImage():Theme::src('img/noimage.jpg')) ?>'); background-size: cover; background-position: center">
                <div class="wd-90">
                
                    <div class="tag-list"> 
                        <?php foreach($page->tags(true) as $tag): ?>
                            <span class="post-tag text-uppercase"><?php echo $tag ?></span>                  
                        <?php endforeach ?>
                        <!-- <span class="read">12 min read</span> -->
                    </div>
           
                    <h1 class="blog-title"><?php echo $page->title(); ?></h1>
                    <div class="author">
                        <img src="<?php echo ($page->user('profilePicture')?$page->user('profilePicture'):Theme::src('img/noavatar.png')) ?>" alt="avatar" class="author-avatar img-circle">
                        <p class="author-info">
                            <span class="author-name">by <b><?php echo $page->user('nickname'); ?></b></span>
                            <span class="date"><?php echo $page->readingTime(); ?></span>                           
                        </p>
                       <!--  <div class="read">12 min read</div> -->
                    </div>                        
                </div>
            </div>
        </div>
        
            <div class="blog-content wd-90">            
                <?php echo $page->content(); ?>                
            </div>
        </div>    
    </section>
    <section id="related">
        <div class="container">
            <p class="text-center">SHARE POST</p>
            <div class="share">
                <p class="text-center">
                    <!-- Social Networks -->
                    <?php foreach (Theme::socialNetworks() as $key=>$label): ?>                    
                        <a class="share-link" href="<?php echo $site->{$key}(); ?>" target="_blank">
                            <img class="share-icon" src="<?php echo DOMAIN_THEME.'img/'.$key.'.png' ?>" alt="<?php echo $label ?>" />                            
                        </a>
                    <?php endforeach; ?>
                    <a class="share-link" href="https://plus.google.com/discover" target="_blank">
                        <img class="share-icon" src="<?php echo DOMAIN_THEME.'img/google_plus.png' ?>" alt="google_plus" />                            
                    </a>
                </p>               
            </div>
            <div class="prev-next-post">
                <div class="row">
                    
                    <?php 
                    if(!empty($page->previousKey())){                   
                        $prevPage = new Page($page->previousKey());                    
                    ?>   
                    
                        <div class="col-md-6 col-sm-12 prev" >                      
                            <a href="<?php echo $prevPage->permalink(); ?>">
                                <div class="post-wrapper-prev" style="background:url('<?php echo ($prevPage->coverImage()?$prevPage->coverImage():Theme::src('img/noimage.jpg')) ?>'); background-size: cover; background-position: center">
                                    
                                    <div class="text-left">
                                        <h4>PREVIOUS</h4>
                                        <h5><?php echo $prevPage->title(); ?></h5>
                                    </div>
                    
                                </div>
                            </a>
                        </div>

                    <?php } else { ?>
                        <div class="col-md-6 col-sm-12 prev">  
                            <div class="post-wrapper-prev" style="background:url('<?php echo Theme::src('img/noimage.jpg') ?>'); background-size: cover; background-position: center">
                                <div class="text-right">                       
                                    <h4>PREVIOUS</h4>
                                    <h5>Oops, No Previous Page</h5>
                                </div>
                            </div>
                        </div>
                    <?php } ?>
                
                    <?php
                    if(!empty($page->nextKey())){
                        $nextPage = new Page($page->nextKey());
                    ?>
                        <div class="col-md-6 col-sm-12 next">
                            <a href="<?php echo $nextPage->permalink(); ?>">
                                <div class="post-wrapper-next" style="background:url('<?php echo ($nextPage->coverImage()?$nextPage->coverImage():Theme::src('img/noimage.jpg')) ?>'); background-size: cover; background-position: center" >
                                    <div class="text-right">                       
                                        <h4>NEXT</h4>
                                        <h5><?php echo $nextPage->title(); ?></h5>
                                    </div>
                                </div> 
                            </a>
                        </div>
                
                    <?php } else { ?>
                        <div class="col-md-6 col-sm-12 next">
                            <div class="post-wrapper-prev" style="background:url('<?php echo Theme::src('img/noimage.jpg') ?>'); background-size: cover; background-position: center">
                                <div class="text-right">                       
                                    <h4>NEXT</h4>
                                    <h5>Oops, No Next Page</h5>
                                </div>
                            </div>
                        </div>
                    <?php } ?>
                </div>
            </div>
        </div>
    </section>
    <section id="demo">
        <div class="container text-center">
            <h2 class="text-center question">Ready to start with data-driven<br/> talent acquisition?</h2> 
            <a class="btn_circle btn" href="https://adwayads.typeform.com/to/LXRknK" target="_blank">REQUEST DEMO</a>      
        </div>
    </section>  
<?php theme::plugins('pageEnd'); ?>