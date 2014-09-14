package controllers

import models.MdTableActor
import play.api.libs.json.JsValue
import play.api.mvc._
import play.api.Play.current

object Application extends Controller {

  def index = Action {
    Ok(views.html.index("Your new application is ready."))
  }

  def socket = WebSocket.acceptWithActor[JsValue, JsValue] { request => out => {
      MdTableActor.props(out)
    }
  }
}