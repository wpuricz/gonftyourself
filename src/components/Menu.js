import { Nav, Container } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

const Menu = () => {
	return (
		<Container>


			<header id="header" role="banner">
				<div class="header-inner">
					<div id="logoWrapper" class="title-logo-wrapper" data-content-field="site-title">

						<h1 id="logoImage" class="tmpl-loading logo-image">
							<a href="/">
								<img src="//images.squarespace-cdn.com/content/v1/5d80446aebe990745f640d35/1592465598397-H1IIC7DP8UANPSN0EGEC/CARBURETED-GO_LOGO-LARGE.png?format=1500w" alt="carbureted - classic car art" /></a></h1>

					</div> <label for="mobileNavToggle" class="mobile-nav-toggle-label show-on-scroll-mobile"><div class="top-bar"></div><div class="middle-bar"></div><div class="bottom-bar"></div></label>
					<div id="headerNav" class="tmpl-loading positioned" >

						<div id="mainNavWrapper" class="nav-wrapper desktop-nav-wrapper show-on-scroll">
							<nav id="mainNavigation" data-content-field="navigation">
								<div class="index home">
									<a href="/#intro-section">
										Home
                      </a>
								</div>

				<div class="index home">
									<a href="/#new-page-68-section">
										Home Intro
                      </a>
								</div>

								<div class="index home">
									<a href="/#about-section">
										About
                      </a>
								</div>


								<div class="index home">
									<a href="/#press-1-section">
										Press
                      </a>
								</div>




								<div class="index base">
									<a href="/">
										Home
                </a>
								</div>


								<div class="collection active">
									<a href="/nft-contact">
										NFT's
              </a>
								</div>


								<div class="index">
									<a href="/fine-art-prints">
										fine art prints
                </a>
								</div>

								<div class="index">
									<a href="/car-art-book">
										Art Books
                </a>
								</div>


								<div class="index">
									<a href="/skate-decks">
										skate decks
                </a>
								</div>

								<div class="index">
									<a href="/gallery-demos">
										gallery &amp; demos
                </a>
								</div>

								<div class="index">
									<a href="/licensing-commissions">
										licensing &amp; commissions
                </a>
								</div>


								<div class="collection">
									<a href="/blog">
										Blog
              </a>
								</div>

							</nav>
						</div>

					</div>
				</div>
			</header>
		</Container>
	)
}

export default Menu
