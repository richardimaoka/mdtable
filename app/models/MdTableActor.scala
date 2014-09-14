package models

import akka.actor.{Actor, ActorRef, Props}
import play.api.libs.json.Json

import scala.concurrent.duration._

/**
 * Created by Richard Imaoka (richard.s.imaoka@gmail.com) on 2014/09/14.
 */


/**
 * Companion object for MdTableActor
 */
object MdTableActor {

  /**
   * Returns Props for the "in" actor used with [[https://www.playframework.com/documentation/2.3.x/ScalaWebSockets Play framework's WebSocket]],
   * which accepts in-coming messages from the WebSocket client(s)
   *
   * @param out actor passed from Play's WebSocket.acceptWithActor method - all messages sent to this "out" will be routed to the WebSocket client(s)
   */
  def props(out: ActorRef) = Props(new MdTableActor(out))
}

/**
 * Market Data Table Actor used with [[https://www.playframework.com/documentation/2.3.x/ScalaWebSockets Play framework's WebSocket.]]
 *
 * This periodically sends a message to a javascript WebSocket client
 */
class MdTableActor(out: ActorRef) extends Actor {

  implicit val ec = context.dispatcher

  def sendMessage = out ! "hello wobsocket!"

  override def receive = Actor.emptyBehavior

  context.system.scheduler.schedule(1 second, 1 second)(sendMessage)

}
