#!/usr/bin/env python

import time
import threading
import requests
import json
from random import randrange
from flask import Flask, request, jsonify


CONTENT_HEADER = {"Content-Type": "application/json"}
PLC_ENDPOINT_URI = "http://plc:6064/key"

check_result = True

host_name = "0.0.0.0"
port = 6067
app = Flask(__name__)             # create an app instance

@app.route("/turn_off", methods=['POST'])
def turn_off():
    global check_result
    try:
        check_result = False
        print("[ALARM] отключен сервер лицензирования")
    except Exception as e:
        print(f'exception raised: {e}')
        return "MALFORMED REQUEST", 400
    return jsonify({"status": True})


@app.route("/turn_on", methods=['POST'])
def turn_on():
    global check_result
    try:
        check_result = True
        print("[ALARM] включен сервер лицензирования")
    except Exception as e:
        print(f'exception raised: {e}')
        return "MALFORMED REQUEST", 400
    return jsonify({"status": True})


@app.route("/check_license", methods=['POST'])
def check_license():
    global check_result
    try:
        print(f"[ATTENTION] сервер вернул {check_result}")
    except Exception as e:
        print(f'exception raised: {e}')
        return "MALFORMED REQUEST", 400
    return jsonify({"status": check_result})


if __name__ == "__main__":
    app.run(port = port, host=host_name)
    