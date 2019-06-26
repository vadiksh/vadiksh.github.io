<?php
/**
 * The base configuration for WordPress
 *
 * The wp-config.php creation script uses this file during the
 * installation. You don't have to use the web site, you can
 * copy this file to "wp-config.php" and fill in the values.
 *
 * This file contains the following configurations:
 *
 * * MySQL settings
 * * Secret keys
 * * Database table prefix
 * * ABSPATH
 *
 * @link https://codex.wordpress.org/Editing_wp-config.php
 *
 * @package WordPress
 */

// ** MySQL settings - You can get this info from your web host ** //
/** The name of the database for WordPress */
define('DB_NAME', '76602yla');

/** MySQL database username */
define('DB_USER', '76602yla');

/** MySQL database password */
define('DB_PASSWORD', '6sl!#4V^zOP%DMIvwRRmVLGf');

/** MySQL hostname */
define('DB_HOST', 'sql1.pcextreme.nl');

/** Database Charset to use in creating database tables. */
define('DB_CHARSET', 'utf8mb4');

/** The Database Collate type. Don't change this if in doubt. */
define('DB_COLLATE', '');

/**#@+
 * Authentication Unique Keys and Salts.
 *
 * Change these to different unique phrases!
 * You can generate these using the {@link https://api.wordpress.org/secret-key/1.1/salt/ WordPress.org secret-key service}
 * You can change these at any point in time to invalidate all existing cookies. This will force all users to have to log in again.
 *
 * @since 2.6.0
 */
define('AUTH_KEY',         'hG=EFcIaknQlcx/Y^T<v?%<>yR$HZ=(9|!!!#hoO_v(Hq^fL!nw#]<qONTqV>Aq3');
define('SECURE_AUTH_KEY',  'w3ujQRa>I%78@orXZ<z, .w</3J[GN=<u4T4Ee~)oo%+BF0(GC}&&wTmRjS{NMZc');
define('LOGGED_IN_KEY',    '^?~ 5-6_`]6g%KbsvyEjb1~X{_{nQ<d>nR_e(?I8ub<P?Bld,zH$!|H,b5+F>WTa');
define('NONCE_KEY',        '6H}JFQ$L7u*};-|QyMH=FuGn01kyr2XVha::#mg-!=%Un?EI2Gk-:]d;nXxJJi/q');
define('AUTH_SALT',        '0AOC<9.5^]JQw8Zk?aaib4EF;a/mPa7,QwW%4=?$J9b&!O9.bm]cqh@Ke7Gbg`o!');
define('SECURE_AUTH_SALT', '|S$x)C56JcU0_Yx+]X&mrX>)am=C2@5/u(xqf9wOktL;P_+^o}g1Oz]cFj+Mz`h^');
define('LOGGED_IN_SALT',   'l,THYr@+p|zTHWd=A0kxk%fr*Sa+}2 DZR.DN4>BVNqRtUb.WM9(|O4#ft,G)y2C');
define('NONCE_SALT',       '=R#2s<Xo6RtF3|Gm6*h[Pn.;(CQr5ppW~)[/2*q5h=13mcJt]xDB=<r5Vn1.Z6lg');

/**#@-*/

/**
 * WordPress Database Table prefix.
 *
 * You can have multiple installations in one database if you give each
 * a unique prefix. Only numbers, letters, and underscores please!
 */
$table_prefix  = 'wp_';

/**
 * For developers: WordPress debugging mode.
 *
 * Change this to true to enable the display of notices during development.
 * It is strongly recommended that plugin and theme developers use WP_DEBUG
 * in their development environments.
 *
 * For information on other constants that can be used for debugging,
 * visit the Codex.
 *
 * @link https://codex.wordpress.org/Debugging_in_WordPress
 */
define('WP_DEBUG', false);

/* That's all, stop editing! Happy blogging. */

/** Absolute path to the WordPress directory. */
if ( !defined('ABSPATH') )
	define('ABSPATH', dirname(__FILE__) . '/');

/** Sets up WordPress vars and included files. */
require_once(ABSPATH . 'wp-settings.php');
