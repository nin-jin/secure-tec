from multiprocessing import Process, Queue
import threading
from time import sleep
from flask import Flask, jsonify, request
import json
import requests



host_name = "0.0.0.0"
port = 6077

REQUEST_HEADERS = {
    "Content-Type": "application/json",
    "auth": "very-secure-token"
}

global_events_log = Queue()


# сервер для приёма сообщений с клиента в тестовых целях
app = Flask(__name__)  # create an app instance


@app.route("/", methods=['POST'])
def data_receive():
    global global_events_log
    try:
        content = request.json
        #print(f"получено сообщение: {content['device']} {content['value']}")
        global_events_log.put(content)                
    except Exception as _:
        #print(e)
        return "BAD DATA RESPONSE", 400
    return jsonify({"status": True})


# авторизация ключа
# def key_in(key):
#     data = {"key": key}
#     response = requests.post(
#         "http://0.0.0.0:6064/key",
#         data=json.dumps(data),
#         headers=REQUEST_HEADERS,
#     )
#     assert response.status_code == 200

#включить сервер лицензирования, будет выдавать true
def turn_on():
    response = requests.post(
        "http://0.0.0.0:6067/turn_on",
        headers=REQUEST_HEADERS,
    )
    assert response.status_code == 200

#выключить сервер лицензирования, будет выдавать false
def turn_off():
    response = requests.post(
        "http://0.0.0.0:6067/turn_off",
        headers=REQUEST_HEADERS,
    )
    assert response.status_code == 200
    
#залогиниться для получения сообщений на указанный адрес
def log_in(login, password, url):
    data = {
        "login" : login,
        "password" : password,
        "url" : url
    }
    response = requests.post(
        "http://0.0.0.0:6069/log_in",
        data=json.dumps(data),
        headers=REQUEST_HEADERS,
    )
    assert response.status_code == 200

#отписаться от получения сообщений
def log_out(login, password):
    data = {
        "login" : login,
        "password" : password
    }
    response = requests.post(
        "http://0.0.0.0:6069/log_out",
        data=json.dumps(data),
        headers=REQUEST_HEADERS,
    )
    assert response.status_code == 200

#обновить настройки (идет в SCADA)
def upload_settings(login, password, max_pow, max_sp, max_temp, min_pow, min_sp, min_temp):
    data = {
        "login" : login,
        "password" : password,
        "max_power" : max_pow,
        "max_speed": max_sp,
        "max_temperature": max_temp,
        "min_power": min_pow,
        "min_speed": min_sp,
        "min_temperature": min_temp
    }
    response = requests.post(
        "http://0.0.0.0:6069/upload_settings",
        data=json.dumps(data),
        headers=REQUEST_HEADERS,
    )
    assert response.status_code == 200

#загрузить обновление (идет в SCADA)
def upload_update(login, password, version):
    temp_headers = {
    "Content-Type": "application/json",
    "auth": "very-secure-token",
    "login": login,
    "password": password
    }
    data = {
        "version" : version
    }
    response = requests.post(
        "http://0.0.0.0:6069/upload_update",
        data=json.dumps(data),
        headers=temp_headers,
    )
    assert response.status_code == 200

#Отправить команду на контроллер (идет через SCADA)
def command_to_plc(login, password, device, operation, value):
    data = {
        "login" : login,
        "password" : password,
        "device": device,
        "operation": operation,
        "value": value
    }
    response = requests.post(
        "http://0.0.0.0:6069/command_to_plc",
        data=json.dumps(data),
        headers=REQUEST_HEADERS,
    )
    assert response.status_code == 200

###
### Functionally tests
###


def test_full_functionality():
    # поднимаем тестовый пульт оператора для приёма сообщений от SCADA
    global global_events_log
    server = Process(target=lambda: app.run(port=port, host=host_name))
    server.start()

    log_in('Vasa', "123456", "http://172.17.0.1:6077/")
    sleep(5)
    upload_settings("Vasa", "123456", 333, 3, 5, 19999, 2999, 44)
    command_to_plc("Vasa", "123456", "power", "reset_range_value", 10)
    sleep(5)
    upload_update("engineer1", "password", "version_test")
    sleep(5)
    log_out('Vasa', "123456")
    # останавливаем тестовый пульт
    server.terminate()
    server.join()
    
    events_log = []
    try:
        # считываем все накопленные события
        while True:
            event = global_events_log.get_nowait()
            events_log.append(event)
    except Exception as _:
        # больше событий нет
        pass
        
    #print(f"список событий: {events_log}")
    
    service_message_found = False
    for i in events_log:
        if type(i['value']) is str and ("[Alarm]" in i['value']):
            service_message_found = True
    assert service_message_found == True
    
    assert len(events_log) > 6
    
    with open("./storage/version_plc.json", "r") as f:
        data = json.load(f)
    assert data['version'] == "version_test"
