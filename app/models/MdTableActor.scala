package models

import akka.actor.{Actor, ActorRef, Props}
import play.api.libs.json.{JsValue, Json}

import scala.concurrent.duration._
import scala.language.postfixOps

/**
 * Created by Richard Imaoka (richard.s.imaoka@gmail.com) on 2014/09/14.
 */


/**
 * Companion object for MdTableActor
 */
object MdTableActor {

  /**
   * Returns Props for the "in" actor for Play's WebScoket,which accepts in-coming messages from the WebSocket client(s)
   *
   * @param out actor passed from Play's WebSocket.acceptWithActor method - all messages sent to this "out" will be routed to the WebSocket client(s)
   */
  def props(out: ActorRef) = Props(new MdTableActor(out))
}

/**
 * Returns Props for the "in" actor used with [[https://www.playframework.com/documentation/2.3.x/ScalaWebSockets Play framework's WebSocket]],
 * which accepts in-coming messages from the WebSocket client(s)
 */
class MdTableActor(out: ActorRef) extends Actor {

  implicit val ec = context.dispatcher
  var i: Int = 1 //This is used to alternate data in createMessage() to simulate asset-data update

  /**
   * Returns Json message for asset-data update
   * The internal int variable i is used to alternate data for each call
   */
  private def createMessage(assetName: String, mid: Int, spread: Int, priceTick: Int, referenceSize: Int, sizeTick: Int): JsValue = {
    val priceOffset = if (i % 2 == 0) priceTick * 1 else priceTick * (-1)
    val sizeAdjustment = if (i % 2 == 0) sizeTick * 1 else sizeTick * (-1)
    val ask = mid + priceOffset + spread
    val bid = mid + priceOffset - spread
    val askSize = referenceSize + sizeAdjustment
    val bidSize = referenceSize - sizeAdjustment

    Json.obj(
      "assetName" -> assetName,
      "rowData" -> Json.obj(
        "ask" -> ask,
        "bid" -> bid,
        "askSize" -> askSize,
        "bidSize" -> bidSize
      )
    )
  }

  /**
   * Send asset-data update messages to a WebSocket client
   */
  def sendMessage: Unit = {
    i += 1
    out ! createMessage("stockA", 50, 1, 1, 100, 10)
    out ! createMessage("stockB", 95, 1, 1, 1200, 10)
    out ! createMessage("stockC", 1000, 1, 1, 1000, 10)
    out ! createMessage("stockD", 200, 2, 1, 3500, 10)
  }

  override def receive = Actor.emptyBehavior

  context.system.scheduler.schedule(1 second, 1 second)(sendMessage)

}
