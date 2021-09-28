import React, { useState } from 'react'
import { useHistory } from 'react-router-dom';
import { alertErrors, alertSuccess } from '../../../settings/config';
import { ACCESS_TOKEN, INFO } from '../../../settings/configUrl';
import { callApi } from '../../../utils/callApi';

export default function MessageComponent() {
    const [visiable, setVisiable] = useState(false);
    const user = JSON.parse(localStorage.getItem(INFO));
    const token = localStorage.getItem(ACCESS_TOKEN);
    const history = useHistory();
    const handleOpenChatBox = (e) => {
        e.preventDefault();
        if (token && user?.id) {
            setVisiable(!visiable)
        } else {
            history.push('/login');
        }
    }
    const sendMessage = (e) => {
        e.preventDefault();
        if (e.target[0].value) {
            const formData = new FormData();
            formData.append('user_id', user.id);
            formData.append('messages', e.target[0].value);
            e.target[0].value = "";
            callApi(`api/support?token=${localStorage.getItem(ACCESS_TOKEN)}`, 'post', formData)
                .then(res => {
                }).catch(e => {
                    alertErrors('Sorry, please try again!');
                })
        } else {
            alertErrors('Please, Enter messages to send');
        }
    }
    return (
        <>
            <div className={visiable ? "chat-box chat__box--none" : "chat-box"}>
                <a href="*" onClick={(e) => handleOpenChatBox(e)}>
                    <img src={process.env.PUBLIC_URL + '/img/chat.png'} alt="*" title="Messenger" />
                </a>
            </div>
            <div className={visiable ? "chat-main chat-active" : "chat-main"}>
                <div className="chat-action">
                    <i className="fa fa-angle-down"
                        onClick={() => setVisiable(!visiable)} title="Hide messenger"></i>
                </div>
                <div className="chat-list">
                    <div className="chat-item">
                        <div className="chat-friend">
                            <figure>
                                <img src={process.env.PUBLIC_URL + '/img/user.png'} alt="*" height={30} width={30} />
                            </figure>
                            <div className="chat-content">
                                <span>Lorem ipsum dolor sit amet amet amet consectetur adipisicing elit.</span>
                            </div>
                        </div>
                        <div className="chat-self">
                            <div className="chat-content">
                                <span>Lorem ipsum dolor sit amet amet amet consectetur adipisicing elit.</span>
                            </div>
                            <figure>
                                <img src={process.env.PUBLIC_URL + '/img/man.png'} alt="*" height={30} width={30} />
                            </figure>
                        </div>
                    </div>
                    <div className="chat-item">
                        <div className="chat-friend">
                            <figure>
                                <img src={process.env.PUBLIC_URL + '/img/user.png'} alt="*" height={30} width={30} />
                            </figure>
                            <div className="chat-content">
                                <span>Lorem ipsum dolor sit amet amet amet consectetur adipisicing elit.</span>
                            </div>
                        </div>
                        <div className="chat-self">
                            <div className="chat-content">
                                <span>Lorem ipsum dolor sit amet amet amet consectetur adipisicing elit.</span>
                            </div>
                            <figure>
                                <img src={process.env.PUBLIC_URL + '/img/man.png'} alt="*" height={30} width={30} />
                            </figure>
                        </div>
                    </div>
                    {/* <div className="chat-empty">
                        <figure>
                            <img src={process.env.PUBLIC_URL + '/img/chat-null.png'} alt="*" title="Messenger" />
                        </figure>
                        <div className="chat__empty--title">
                            <span>
                                No conversations found
                            </span>
                        </div>
                    </div> */}
                </div>
                <form onSubmit={sendMessage} className="chat-form">
                    <div className="input-group">
                        <input type="text" className="form-control" />
                        <button className="btn btn-primary"><i class="fa fa-paper-plane"></i></button>
                    </div>
                </form>
            </div>
        </>
    )
}
