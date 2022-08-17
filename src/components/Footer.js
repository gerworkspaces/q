import React from "react";
import '../stylesheet/footer.css'

function Footer() {
  return (
    <div>
       <div className=" footer">
            <div className="row section">
                <div className="col-12 col-sm-12 col-md-3 col-lg-3 col-xl-3">
                    <h3>MIỄN PHÍ GIAO HÀNG</h3>
                    <ul>
                        <li><a href="#">FreeShip trong nội thành</a></li>
                        <li><a href="#">Phương thức vận chuyển</a></li>
                       
                    </ul>
                </div>
                <div className="col-12 col-sm-12 col-md-3 col-lg-3 col-xl-3">
                    <h3>HỖ TRỢ KHÁCH HÀNG</h3>
                    <ul>
                        <li><a href="#">Hương dẫn đặt hàng</a></li>
                        <li><a href="#">Phương thức thanh toán </a></li>
                       
                    </ul>
                </div>
                <div className="col-12 col-sm-12 col-md-3 col-lg-3 col-xl-3">
                    <h3>HỖ TRỢ</h3>
                    <ul>
                        <li><a href="#">Liên hệ</a></li>
                        <li><a href="#">Bảo mật</a></li>
                    </ul>
                </div>
                <div className="col-12 col-sm-12 col-md-3 col-lg-3 col-xl-3">
                <div className="btn-group dropup text-md-right">
                        <button type="button" className="btn button--dropup dropdown-toggle" data-toggle="dropdown"
                            aria-haspopup="true" aria-expanded="false">
                            <i className="fa fa-globe"></i>English
                        </button>
                        <div className="dropdown-menu">
                           
                            <a className="dropdown-item" href="#">English</a>
                            <a className="dropdown-item" href="#">Deutsch</a>
                            <a className="dropdown-item" href="#">Español</a>
                            <a className="dropdown-item" href="#">Français</a>
                            <a className="dropdown-item" href="#">Bahasa Indonesia</a>
                            <a className="dropdown-item" href="#">Italiano</a>
                            <a className="dropdown-item" href="#">日本語</a>
                        </div>
                    </div>
                </div>
            </div>
            <hr />
            <div className="footer__copyright">
                <p>MyEbook</p>
            </div>
        </div>
    </div>
  );
}
export default Footer;
