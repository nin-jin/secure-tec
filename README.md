# Кибериммунная ТЭЦ

[Вся документация доступна на вики](https://page.hyoo.ru/#!=7ovfzm_js18ie)

В конце каждой страницы есть время её последней модификации. Документация написана в формате MarkedText и на всякий случай продублирована далее...

<h1>
<span>Задача</span>
</h1><blockquote>
<p>
<span>Создание программы для авторизованного управления оборудованием на теплоэлектростанции, поддерживающей обновление ПО с контролем лицензии.</span>
</p>
</blockquote><h1>
<span>Ограничения</span>
</h1><blockquote>
<p>
<span>По условиям организаторов должна использоваться микросервисная архитектура и шина обмена сообщениями со встроенным монитором безопасности.</span>
</p>
</blockquote><h1>
<span>Концепция</span>
</h1><blockquote>
<p>
<span>Дорогостоящее оборудование должно надёжно управляться только ответственным за него специалистами на основе правдивой и своевременной информации о его состоянии через сертифицированное лицензионное ПО.</span>
</p><p>
<span>В соответствии с принципом нулевого доверия, используется криптография для алгоритмического обеспечения целей безопасности на каждом узле системы.</span>
</p>
</blockquote><p>
<span>---</span>
</p><p></p><hr><h1>
<span>Цели безопасности</span>
</h1><ol>
<li>
<p>
<span>👀 </span><strong><span>Оператор видит корректную информацию</span></strong><span> о состоянии оборудовании в реальном времени, иначе может принять неверное решение, которое может привести к порче оборудования.</span>
</p>
</li><li>
<p>
<span>🛂 </span><strong><span>Только авторизованный оператор</span></strong><span> может управлять оборудованием в соответствии с ролевой моделью. Человек без подготовки или полномочий может навредить работе системы.</span>
</p>
</li><li>
<p>
<span>🧗‍♂️ Система выполняет свою функцию даже при выходе из строя или компрометации </span><strong><span>любого одного компонента системы</span></strong><span>. Поведение неуправляемой системы может быть сколь угодно плачевным.</span>
</p>
</li><li>
<p>
<span>👨‍💻 Запущенное </span><strong><span>ПО аутентифицировано его поставщиком</span></strong><span>, ответственным за обеспечение остальных целей, и предоставляющим обновления "на лету".</span>
</p>
</li><li>
<p>
<span>🎫 При </span><strong><span>истёкшем сроке лицензии</span></strong><span>, ПО продолжает работу, но его обновление не происходит.</span>
</p>
</li><li>
<p>
<span>🎁 Действия пользователей не может привести к </span><strong><span>утечке ключевого ПО</span></strong><span>.</span>
</p>
</li>
</ol><hr><h1>
<span>Предположения безопасности</span>
</h1><ol>
<li>
<p>
<strong><span>Оператор благонадёжен</span></strong><span> и ответственно выполняет все предназначенные для него регламенты, но как человек он может непреднамеренно ошибиться.</span>
</p>
</li><li>
<p>
<span>Каждый пользователь системы работает только под своей </span><strong><span>учётной записью</span></strong><span>.</span>
</p>
</li><li>
<p>
<span>В оборудовании, ОС и нашем собственном коде, </span><strong><span>нет закладок</span></strong><span>, но могут быть ошибки.</span>
</p>
</li><li>
<p>
<span>На каждом узле есть не доступное из вне </span><strong><span>хранилище ключей</span></strong><span>.</span>
</p>
</li><li>
<p>
<span>Технологическое </span><strong><span>оборудование исправно</span></strong><span>.</span>
</p>
</li><li>
<p>
<span>Пользователи имеют лишь </span><strong><span>удалённый доступ</span></strong><span> к системе управления.</span>
</p>
</li>
</ol><hr><h1>
<span>Угрозы безопасности</span>
</h1><table>
<tr>
<td>
<p>
<span>❌ </span><strong><span>Событие</span></strong>
</p>
</td><td>
<p>
<span>✅ </span><strong><span>Защита</span></strong>
</p>
</td>
</tr><tr>
<td>
<p>
<span>Сигнал изменён</span>
</p>
</td><td>
<p>
<span>Цифровая подпись</span>
</p>
</td>
</tr><tr>
<td>
<p>
<span>Автор сигнала не имеет прав</span>
</p>
</td><td>
<p>
<span>Криптоавторизация</span>
</p>
</td>
</tr><tr>
<td>
<p>
<span>Сигнал не доставлен</span>
</p>
</td><td>
<p>
<span>Протокол синхронизации</span>
</p><p>
<span>Дублирование промежуточных узлов</span>
</p>
</td>
</tr><tr>
<td>
<p>
<span>Сигнал не обработан</span>
</p>
</td><td>
<p>
<span>Реакция не на события, а на изменение состояния</span>
</p>
</td>
</tr><tr>
<td>
<p>
<span>Дребезг управления при быстрой смене сигналов</span>
</p>
</td><td>
<p>
<span>Реакция не на события, а на изменение состояния</span>
</p>
</td>
</tr><tr>
<td>
<p>
<span>ПО изменено не вендором</span>
</p>
</td><td>
<p>
<span>Цифровая подпись на стороне вендора</span>
</p><p>
<span>Криптоавторизация</span>
</p>
</td>
</tr><tr>
<td>
<p>
<span>Утечка ПО через пользователя</span>
</p>
</td><td>
<p>
<span>Шифрация секретным ключом на стороне вендра</span>
</p><p>
<span>Расшифровка непосредственно в обновляемом процессе</span>
</p>
</td>
</tr><tr>
<td>
<p>
<span>Обновление ПО по истечении срока лицензии</span>
</p>
</td><td>
<p>
<span>Криптоавторизация</span>
</p><p>
<span>Проверка срока при установке</span>
</p>
</td>
</tr><tr>
<td>
<p>
<span>Подделка лицензии</span>
</p>
</td><td>
<p>
<span>Криптоавторизация</span>
</p><p>
<span>Приптопривязка лицензии к конкретным инстансам</span>
</p>
</td>
</tr>
</table><hr><h1>
<span>Функциональность</span>
</h1><h2>
<span>Каждый узел</span>
</h2><ul>
<li>
<p>
<span>Выдаёт версию ПО.</span>
</p>
</li><li>
<p>
<span>Выдаёт статус активности.</span>
</p>
</li><li>
<p>
<span>Выдаёт статус обновления.</span>
</p>
</li>
</ul><h2>
<span>Сенсор</span>
</h2><ul>
<li>
<p>
<span>Выдаёт значение показателя.</span>
</p>
</li><li>
<p>
<span>Показатель может требовать предварительной обработки.</span>
</p>
</li>
</ul><h3>
<span>Сенсоры ТЭЦ</span>
</h3><ul>
<li>
<p>
<span>power_sensor - вырабатываемая мощность.</span>
</p>
</li><li>
<p>
<span>temp_sensor - температура воздуха.</span>
</p>
</li><li>
<p>
<span>freq_sensor - частота вращения турбины.</span>
</p>
</li>
</ul><h2>
<span>Драйвер</span>
</h2><ul>
<li>
<p>
<span>Слушает управляющий сигнал.</span>
</p>
</li><li>
<p>
<span>Выдаёт статус текущего действия.</span>
</p>
</li>
</ul><h3>
<span>Драйверы ТЭЦ</span>
</h3><ul>
<li>
<p>
<span>power_driver - вырабатываемая мощность.</span>
</p>
</li><li>
<p>
<span>main_driver - запуск/останов турбины.</span>
</p>
</li>
</ul><hr><h1>
<span>Ролевая модель</span>
</h1><table>
<tr>
<td>
<p>
<strong><span>Роль</span></strong>
</p>
</td><td>
<p>
<strong><span>Права и обязанности</span></strong>
</p>
</td>
</tr><tr>
<td>
<p>
<span>👼 Наблюдатель</span>
</p>
</td><td>
<p>
<span>Мониторит состояние системы.</span>
</p>
</td>
</tr><tr>
<td>
<p>
<span>👨 Оператор</span>
</p>
</td><td>
<p>
<span>Наблюдает за оборудованием и управляет им.</span>
</p>
</td>
</tr><tr>
<td>
<p>
<span>🧔 Инженер</span>
</p>
</td><td>
<p>
<span>Обновляет ПО и лицензии.</span>
</p>
</td>
</tr><tr>
<td>
<p>
<span>🤴 Админ</span>
</p>
</td><td>
<p>
<span>Настраивает политики безопасности</span>
</p>
</td>
</tr><tr>
<td>
<p>
<span>🎅 Вендор</span>
</p>
</td><td>
<p>
<span>Предоставляет лицензии и ПО</span>
</p>
</td>
</tr>
</table><hr><h1>
<span>Решение</span>
</h1><h2>
<span>Архитектура</span>
</h2><p>
<img src="https://i.imgur.com/Yhbikn6.png" alt="">
</p><p>
<strong><span>Устойчивая</span></strong><span>: Все узлы минимум продублированы.</span>
</p><p>
<strong><span>Крипрографическая</span></strong><span>: Все узлы объединены в единую криптосеть.</span>
</p><p>
<strong><span>Реплицированная</span></strong><span>: Все данные продублированы в распределённой БД между всеми заинтересованными узлами.</span>
</p><p>
<strong><span>Реактивная</span></strong><span>: Прикладные задачи реагируют на изменение состояния БД, а не на события.</span>
</p><p>
<strong><span>Доверенная</span></strong><span>: Вся информация аутентифицирована на входном узле.</span>
</p><p>
<strong><span>Децентрализованная</span></strong><span>: Каждый узел независимо проверяет аутентификацию и авторизацию.</span>
</p><h2>
<span>Минимизация недоверенного кода</span>
</h2><ul>
<li>
<p>
<span>Свой протокол синхронизации - не нужны внешние сервисы: Message Queue.</span>
</p>
</li><li>
<p>
<span>Только свой код - не нужны сторонние зависимости: node_modules.</span>
</p>
</li><li>
<p>
<span>Алгоритмический контроль доступа - не нужен аудитор запросов.</span>
</p>
</li>
</ul><h2>
<span>Алгоритмические гарантии</span>
</h2><ul>
<li>
<p>
<span>Узлы не знают друг о друге, а взаимодействуют только с базой данных $hyoo_crowd, которая автоматически синхронизируется между узлами.</span>
</p>
</li><li>
<p>
<span>Входные сигналы проверяются в экшенах, подписываются цифровой подписью, и вносятся в систему.</span>
</p>
</li><li>
<p>
<span>Драйвер $hyoo_crowd отвергает любые неавторизованные юниты информации, получаемые как из внешних систем, так и локальной базы данных.</span>
</p>
</li><li>
<p>
<span>В изолированном периметре либо нет стороннего кода, либо он минимален.</span>
</p>
</li><li>
<p>
<span>Даже если скомпрометированный узел внёс в свою базу неавторизованные изменения, другие узлы откажутся с ним синхронизироваться.</span>
</p>
</li><li>
<p>
<span>Задачи мониторят изменение состояния в реальном времени и отражают эти изменения на других состояниях или на подконтрольных системах.</span>
</p>
</li>
</ul><h2>
<span>Почему без брокера сообщений?</span>
</h2><ul>
<li>
<p>
<span>Реактивная архитектура с синхронизацией состояния проще и надёжнее событийной.</span>
</p>
</li><li>
<p>
<span>Затруднительно обеспечивать доверие стороннему сервису.</span>
</p>
</li><li>
<p>
<span>Сервер синхронизации уже является аналогом брокера сообщений, так как связывает все узлы системы и гарантирует доставку всех изменений в БД.</span>
</p>
</li><li>
<p>
<span>Отдельный брокер сообщений требует отдельные доверенные механизмы обновления и конфигурирования.</span>
</p>
</li>
</ul><h2>
<span>Почему без монитора безопасности?</span>
</h2><ul>
<li>
<p>
<span>Обход или компрометация монитора безопасности делает систему полностью беззащитной.</span>
</p>
</li><li>
<p>
<span>Сервер синхронизации уже является аналогом централизованного монитора безопасности, так как проверяет аутентификацию и авторизацию всех проходящих через него юнитов информации.</span>
</p>
</li><li>
<p>
<span>Драйвер $hyoo_crowd уже является мини-монитором безопасности, стоящим перед каждым узлом.</span>
</p>
</li><li>
<p>
<span>Отдельный монитор безопасности требует отдельные доверенные механизмы обновления и конфигурирования.</span>
</p>
</li>
</ul><hr><h1>
<span>Узлы системы</span>
</h1><table>
<tr>
<td>
<p>
<span>Название</span>
</p>
</td><td>
<p>
<span>Назначение</span>
</p>
</td><td>
<p>
<span>Комментарий</span>
</p>
</td><td>
<p>
<span>Скоуп хакатона</span>
</p>
</td>
</tr><tr>
<td>
<p>
<span>Sync</span>
</p>
</td><td>
<p>
<span>Поддержание связности компонент для синхронизации БД в реальном времени.</span>
</p><p>
<span>Предотвращение распространения неавторизованных юнитов информации по сети.</span>
</p>
</td><td>
<p>
<span>Несколько экземпляров на разных физических устройствах.</span>
</p>
</td>
</tr>
</table><pre>
<span> ! ⭕
</span>
</pre><table>
<tr>
<td>
<p>
<span>Persister</span>
</p>
</td><td>
<p>
<span>Резервирование состояния БД в ПЗУ.</span>
</p>
</td><td>
<p>
<span>Несколько экземпляров на разных физических устройствах.</span>
</p>
</td>
</tr>
</table><pre>
<span> ! ⭕
</span>
</pre><table>
<tr>
<td>
<p>
<span>Temp Sensor</span>
</p>
</td><td>
<p>
<span>Управление датчиком температуры воздуха.</span>
</p><p>
<span>Приём от него показаний.</span>
</p><p>
<span>Внесение показаний в БД.</span>
</p>
</td><td>
<p>
<span>На каждый датчик - отдельный экземпляр Sensor.</span>
</p>
</td><td>
<p>
<span>✅</span>
</p>
</td>
</tr><tr>
<td>
<p>
<span>Freq Sensor</span>
</p>
</td><td>
<p>
<span>Управление датчиком скорости вращения турбины.</span>
</p><p>
<span>Снятие с него показаний.</span>
</p><p>
<span>Предварительная их обработка.</span>
</p><p>
<span>Внесение обработанных показаний в БД.</span>
</p>
</td><td>
<p>
<span>На каждый датчик - отдельный экземпляр Sensor.</span>
</p>
</td><td>
<p>
<span>✅</span>
</p>
</td>
</tr><tr>
<td>
<p>
<span>Power Sensor</span>
</p>
</td><td>
<p>
<span>Управление датчиком выходной мощности турбины.</span>
</p><p>
<span>Снятие с него показаний.</span>
</p><p>
<span>Внесение показаний в БД.</span>
</p>
</td><td>
<p>
<span>На каждый датчик - отдельный экземпляр Sensor.</span>
</p>
</td><td>
<p>
<span>✅</span>
</p>
</td>
</tr><tr>
<td>
<p>
<span>Power Driver</span>
</p>
</td><td>
<p>
<span>Подача сигналов на устройство управления турбиной в соответствии с актуальными установками оператора.</span>
</p><p>
<span>Внесение в БД статуса своей работы.</span>
</p>
</td><td>
<p>
<span>На каждую турбину - отдельный экземпляр Driver.</span>
</p>
</td><td>
<p>
<span>✅</span>
</p>
</td>
</tr><tr>
<td>
<p>
<span>Defender</span>
</p>
</td><td>
<p>
<span>Мониторинг критических показателей.</span>
</p><p>
<span>Автономная автоматизация реакции на нештатные ситуации.</span>
</p><p>
<span>Внесение в БД статуса своей работы.</span>
</p>
</td><td>
<p>
<span>На каждое защитное устройство - отдельный экземпляр Defender.</span>
</p>
</td><td>
<p>
<span>⭕</span>
</p>
</td>
</tr><tr>
<td>
<p>
<span>HMI</span>
</p>
</td><td>
<p>
<span>Отображение авторизованному пользователю аутентифицированного состояния турбины.</span>
</p><p>
<span>Аутентификация и внесение в БД команд оператора.</span>
</p><p>
<span>Загрузка инженером обновлений ПО и лицензий.</span>
</p>
</td><td>
<p>
<span>Встраивается прямо в АРМ.</span>
</p>
</td>
</tr>
</table><pre>
<span> ! ⭕
</span>
</pre><hr><h1>
<span>Компоненты узлов</span>
</h1><h2>
<span>🔴 Не доверенные</span>
</h2><table>
<tr>
<td>
<p>
<strong><span>Название</span></strong>
</p>
</td><td>
<p>
<strong><span>Назначение</span></strong>
</p>
</td>
</tr><tr>
<td>
<p>
<span>DAC</span>
</p>
</td><td>
<p>
<span>Управление оборудованием.</span>
</p>
</td>
</tr><tr>
<td>
<p>
<span>ADC</span>
</p>
</td><td>
<p>
<span>Замер показателей оборудования.</span>
</p>
</td>
</tr><tr>
<td>
<p>
<span>WS</span>
</p>
</td><td>
<p>
<span>Работа с WebSocket соединениями.</span>
</p>
</td>
</tr><tr>
<td>
<p>
<span>Sync</span>
</p>
</td><td>
<p>
<span>Синхронизация БД</span>
</p>
</td>
</tr><tr>
<td>
<p>
<span>PG</span>
</p>
</td><td>
<p>
<span>Коммуникация с PostgreSql</span>
</p>
</td>
</tr><tr>
<td>
<p>
<span>PostgreSql</span>
</p>
</td><td>
<p>
<span>Хранение юнитов.</span>
</p><p>
<span>Выборка юнитов.</span>
</p><p>
<span>Гарантия целостности хранилища.</span>
</p>
</td>
</tr><tr>
<td>
<p>
<span>IndexedDb</span>
</p>
</td><td>
<p>
<span>Хранение юнитов.</span>
</p><p>
<span>Выборка юнитов.</span>
</p><p>
<span>Гарантия целостности хранилища.</span>
</p>
</td>
</tr><tr>
<td>
<p>
<span>DB.D</span>
</p>
</td><td>
<p>
<span>Хранение юнитов.</span>
</p><p>
<span>Выборка юнитов.</span>
</p><p>
<span>Гарантия целостности хранилища.</span>
</p>
</td>
</tr><tr>
<td>
<p>
<span>User</span>
</p>
</td><td>
<p>
<span>Выполнение должностных обязанностей через АРМ.</span>
</p>
</td>
</tr>
</table><h2>
<span>🟡 Повышающие доверие</span>
</h2><table>
<tr>
<td>
<p>
<strong><span>Название</span></strong>
</p>
</td><td>
<p>
<strong><span>Назначение</span></strong>
</p>
</td>
</tr><tr>
<td>
<p>
<span>CROWD</span>
</p>
</td><td>
<p>
<span>Управление юнитами информации.</span>
</p><p>
<span>Аутентификация и авторизация юнитов.</span>
</p>
</td>
</tr>
</table><h2>
<span>🟢 Доверенные</span>
</h2><table>
<tr>
<td>
<p>
<strong><span>Название</span></strong>
</p>
</td><td>
<p>
<strong><span>Назначение</span></strong>
</p>
</td>
</tr><tr>
<td>
<p>
<span>NodeJS</span>
</p>
</td><td>
<p>
<span>Исполнение ПО в виртуальной машине.</span>
</p>
</td>
</tr><tr>
<td>
<p>
<span>Browser</span>
</p>
</td><td>
<p>
<span>Отображение аутентичных данных пользователю.</span>
</p><p>
<span>Приём управляющих сигналов от пользователя.</span>
</p>
</td>
</tr><tr>
<td>
<p>
<span>Domain</span>
</p>
</td><td>
<p>
<span>Работа с БД в терминах предметной области.</span>
</p>
</td>
</tr><tr>
<td>
<p>
<span>Installer</span>
</p>
</td><td>
<p>
<span>Отслеживает появление обновлений в БД.</span>
</p><p>
<span>Проверяет сроки лицензии.</span>
</p><p>
<span>Расшифровывает новый код.</span>
</p><p>
<span>Выгружающий его в ФС.</span>
</p><p>
<span>Завершает работу контроллера для автоперезапуска с новым кодом.</span>
</p>
</td>
</tr><tr>
<td>
<p>
<span>File System</span>
</p>
</td><td>
<p>
<span>Хранение исполняющегося ПО.</span>
</p>
</td>
</tr><tr>
<td>
<p>
<span>Tasks</span>
</p>
</td><td>
<p>
<span>Отслеживание состояния БД.</span>
</p><p>
<span>Прямое воздействие на подконтрольные управляющие устройства.</span>
</p>
</td>
</tr><tr>
<td>
<p>
<span>Actions</span>
</p>
</td><td>
<p>
<span>Приём показаний от сенсоров.</span>
</p><p>
<span>Фильтрация и пред агрегация показаний.</span>
</p><p>
<span>Упаковка показаний в аутентичные юниты.</span>
</p><p>
<span>Внесение юнитов в БД.</span>
</p>
</td>
</tr>
</table><hr><h1>
<span>Рабочие сценарии</span>
</h1><h2>
<span>Успешная установка обновления</span>
</h2><p>
<span>В пакете может быть как зашифрованный код ПО, так и сроки лицензии. Если сроки не истекли и одновременно в БД есть свежее обновление, то оно устанавливается автоматически.</span>
</p><p>
<img src="https://i.imgur.com/xtPV3jd.png" alt="">
</p><h2>
<span>Установка обновления при истёкшей лицензии</span>
</h2><p>
<span>Обновление ПО сохраняется в БД, но не устанавливается, пока лицензия не будет продлена.</span>
</p><p>
<img src="https://i.imgur.com/KPh1uF0.png" alt="">
</p><h2>
<span>Установка не аутентичных пакетов</span>
</h2><p>
<span>Обновления ПО и лицензии с нарушенной целостностью отвергаются сразу и не попадают в систему.</span>
</p><p>
<img src="https://i.imgur.com/mATa6Uv.png" alt="">
</p><h2>
<span>Управление мощностью турбины</span>
</h2><p>
<span>Установки оператора проверяются минимум на 2 узлах, к которым у него нет прямого доступа. Состояние турбины может вносить в БД только её драйвер. Оператор видит гарантированно аутентичный статус турбины и время последнего обновления статуса.</span>
</p><p>
<img src="https://i.imgur.com/dutE23k.png" alt="">
</p><h2>
<span>Приём данных с датчика скорости вращения</span>
</h2><p>
<span>Состояние датчика может вносить в БД только его драйвер. Оператор видит гарантированно аутентичные показатели и время последнего их обновления.</span>
</p><p>
<img src="https://i.imgur.com/1pKfshI.png" alt="">
</p><hr><h1>
<span>Негативные сценарии</span>
</h1><h2>
<span>Компрометация узлов</span>
</h2><table>
<tr>
<td>
<p>
<span>Описание проблемы</span>
</p>
</td><td>
<p>
<span>Уязвимое место</span>
</p>
</td><td>
<p>
<span>Нарушенная цель</span>
</p>
</td><td>
<p>
<span>Стратегия снижения опасности</span>
</p>
</td>
</tr><tr>
<td>
<p>
<span>Скомпрометированный сенсор пишет в БД не корректные данные.</span>
</p>
</td><td>
<p>
<span>Sensor</span>
</p>
</td><td>
<p>
<span>1 👀</span>
</p>
</td><td>
<p>
<span>Расхождение показаний с дублирующими сенсорами может помочь выявить проблему.</span>
</p>
</td>
</tr><tr>
<td>
<p>
<span>Скомпрометированный драйвер подаёт некорректные сигналы на устройство.</span>
</p>
</td><td>
<p>
<span>Driver</span>
</p>
</td><td>
<p>
<span>3 🧗‍♂️</span>
</p>
</td><td>
<p>
<span>Сигналы с сенсоров позволят выявить проблему.  </span>
</p>
</td>
</tr><tr>
<td>
<p>
<span>Скомпрометированный драйвер не пропускает сигналы управления устройством.</span>
</p>
</td><td>
<p>
<span>Driver</span>
</p>
</td><td>
<p>
<span>3 🧗‍♂️</span>
</p>
</td><td>
<p>
<span>Управляющий сигнал дойдёт через дублирующий драйвер.</span>
</p>
</td>
</tr><tr>
<td>
<p>
<span>Установщик не проверяет истечение срока лицензии.</span>
</p>
</td><td>
<p>
<span>Controller</span>
</p>
</td><td>
<p>
<span>5 🎫</span>
</p>
</td><td>
<p>
<span>Сценарий должен проверяться автотестами.</span>
</p>
</td>
</tr>
</table><h2>
<span>Компрометация компонентов контроллера</span>
</h2><h3>
<span>I - Идеальный вариант</span>
</h3><table>
<tr>
<td>
<p>
<span>Ошибка в сетевой библиотеке нарушает протокол синхронизации, что приводит к исключению узла из пиринговой сети.</span>
</p>
</td><td>
<p>
<span>WS</span>
</p>
</td><td>
<p>
<span>3 🧗‍♂️</span>
</p>
</td><td>
<p>
<span>Обновление ПО на новую версию библиотеки сперва проводится на менее важных узлах.</span>
</p>
</td>
</tr><tr>
<td>
<p>
<span>Ошибка в библиотеке синхронизации БД нарушает протокол синхронизации, что приводит к исключению узла из пиринговой сети.</span>
</p>
</td><td>
<p>
<span>Sync</span>
</p>
</td><td>
<p>
<span>3 🧗‍♂️</span>
</p>
</td><td>
<p>
<span>Обновление ПО на новую версию библиотеки сперва проводится на менее важных узлах.</span>
</p>
</td>
</tr>
</table><h3>
<span>P - Проектный вариант</span>
</h3><p>
<span>Дополнительно к идеальному:</span>
</p><table>
<tr>
<td>
<p>
<span>Скомпрометированная сетевая библиотека нарушает протокол синхронизации, что приводит к исключению узла из пиринговой сети.</span>
</p>
</td><td>
<p>
<span>WS</span>
</p>
</td><td>
<p>
<span>3 🧗‍♂️</span>
</p>
</td><td>
<p>
<span>Обновление ПО на новую версию библиотеки сперва проводится на менее важных узлах.</span>
</p>
</td>
</tr>
</table><h3>
<span>H - Хакатоновский вариант</span>
</h3><p>
<span>Дополнительно к проектному:</span>
</p><table>
<tr>
<td>
<p>
<span>Скомпрометированная сетевая библиотека обходит встроенный монитор безопасности (CROWD) и напрямую управляет устройствами.</span>
</p>
</td><td>
<p>
<span>WS</span>
</p>
</td><td>
<p>
<span>2 🛂</span>
</p>
</td><td>
<p>
<span>—</span>
</p>
</td>
</tr><tr>
<td>
<p>
<span>Скомпрометированная сетевая библиотека обходит встроенный монитор безопасности (CROWD) и вносит в БД некорректные данные.</span>
</p>
</td><td>
<p>
<span>WS</span>
</p>
</td><td>
<p>
<span>1 👀</span>
</p>
</td><td>
<p>
<span>—</span>
</p>
</td>
</tr>
</table><hr><h1>
<span>Варианты реализации</span>
</h1><blockquote>
<p>
<span>I - идеальное решение, если у нас будут все необходимые ресурсы на разработку инноваций.</span>
</p><p>
<span>P - проектное решение, которое мы готовы реализовать с текущими технологиями.</span>
</p><p>
<span>H - упрощённое решение запланированное на хакатон.</span>
</p><p>
<span>R - что реально успели сделать к дедлайну.</span>
</p>
</blockquote><hr><h1>
<span>I - Идеал когда-нибудь</span>
</h1><h2>
<span>Controller - управляющий контроллер</span>
</h2><p>
<span>Датчики, управляющие устройства, защитные устройства и тд.</span>
</p><p>
<img src="https://i.imgur.com/BaAcgNY.png" alt="">
</p><h2>
<span>Sync - сервер синхронизации</span>
</h2><p>
<span>Обеспечивает связность узлов и гарантию доставки, попутно проверяя аутентификацию и авторизацию.</span>
</p><p>
<img src="https://i.imgur.com/lhkWs1p.png" alt="">
</p><h2>
<span>Persister - сервер персистентности</span>
</h2><p>
<span>Бэкапит состояние БД в постоянное хранилище.</span>
</p><p>
<img src="https://i.imgur.com/2321kf2.png" alt="">
</p><h2>
<span>HMI - рабочее место</span>
</h2><p>
<span>Аутентифицирует действия пользователя и отображает только аутентичные данные из системы.</span>
</p><p>
<img src="https://i.imgur.com/MZd8NXL.png" alt="">
</p><hr><h1>
<span>P - Проект хоть завтра</span>
</h1><h2>
<span>Controller - управляющий контроллер</span>
</h2><p>
<span>Датчики, управляющие устройства, защитные устройства и тд.</span>
</p><p>
<img src="https://i.imgur.com/PugkOAR.png" alt="">
</p><h2>
<span>Sync - сервер синхронизации</span>
</h2><p>
<span>Обеспечивает связность узлов и гарантию доставки, попутно проверяя аутентификацию и авторизацию.</span>
</p><p>
<img src="https://i.imgur.com/QkCy1iF.png" alt="">
</p><h2>
<span>Persister - сервер персистентности</span>
</h2><p>
<span>Бэкапит состояние БД в постоянное хранилище.</span>
</p><p>
<img src="https://i.imgur.com/k3k8gAL.png" alt="">
</p><h2>
<span>HMI - рабочее место</span>
</h2><p>
<span>Аутентифицирует действия пользователя и отображает только аутентичные данные из системы.</span>
</p><p>
<img src="https://i.imgur.com/qGduTm0.png" alt="">
</p><hr><h1>
<span>H - План на хакатон</span>
</h1><h2>
<span>Controller - управляющий контроллер</span>
</h2><p>
<span>Датчики, управляющие устройства, защитные устройства и тд.</span>
</p><p>
<img src="https://i.imgur.com/uRJbUqh.png" alt="">
</p><h2>
<span>Sync - сервер синхронизации</span>
</h2><p>
<span>Обеспечивает связность узлов и гарантию доставки, попутно проверяя аутентификацию и авторизацию.</span>
</p><p>
<img src="https://i.imgur.com/PvfS04g.png" alt="">
</p><h2>
<span>Persister - сервер персистентности</span>
</h2><p>
<span>Бэкапит состояние БД в постоянное хранилище.</span>
</p><p>
<img src="https://i.imgur.com/2X6NC9r.png" alt="">
</p><h2>
<span>HMI - рабочее место</span>
</h2><p>
<span>Аутентифицирует действия пользователя и отображает только аутентичные данные из системы.</span>
</p><p>
<img src="https://i.imgur.com/dsDPs9m.png" alt="">
</p><hr><h1>
<span>R - Что реально успели</span>
</h1><p>
<span>Пока ещё ничего 😅</span>
</p><hr><h1>
<span>База Данных</span>
</h1><h2>
<span>Структура БД</span>
</h2><p>
<img src="https://i.imgur.com/eyr63qN.png" alt="">
</p><p>
<span>Вся база данных (world) делится на кластеры (land). Каждый ленд содержит всю необходимую для аутентификации и авторизации информацию, и синхроизируется атомарно.</span>
</p><p>
<span>Каждый участник системы генерирует приватный ключ, хранит его у себя в надёжном хранилище и никому не показывает. Его публичная пара используется для аутентификации.</span>
</p><p>
<span>За каждым приватным ключом алгоритмически закреплён 1 ленд, на который у владельца ключа есть полные права. Авторизованно писать в этот ленд может только он. Все сенсоры пишут свои показания в свои ленды, что исключает возможность поделки показаний.</span>
</p><p>
<span>Каждый контроллер, допускающий управление, создаёт ещё один ленд (intent), права на управление которым есть только у администратора. Даже сам контроллер не может в него писать. А вот админ может выдавать права на запись в этот ленд операторам.</span>
</p><p>
<span>У оператора, которому разрешено менять intent, автоматически появляется интерфейс для управления контроллером. Контроллер слушает intent и реагирует на его изменения.</span>
</p><p>
<span>У вендора есть свой приватный ключ и соответствующий ему ленд. В этот ленд он пишет код ПО и информацию о сроках лицензии. После чего выгружает этот ленд в виде пакета, который передаётся клиенту, чтобы инженер поддержки загрузил пакет в систему, что приводит к обновлению ленда вендора в системе заказчика.</span>
</p><p>
<span>Все узлы системы слушают ленд вендора, и обнаружив свежий код для своего типа контроллера и проверив сроки лицензии для своего публичного ключа, устанавливают обновление.</span>
</p><h2>
<span>Реализация</span>
</h2><h3>
<span>Библиотеки</span>
</h3><blockquote>
<p>
<a href="https://github.com/hyoo-ru/crowd.hyoo.ru"><span>$hyoo_crowd</span></a><span> - библиотека для реактивной работы с БД в памяти.</span>
</p><p>
<a href="https://github.com/hyoo-ru/sync.hyoo.ru"><span>$hyoo_sync</span></a><span> - библиотека для синхронизации БД с ФС и с сервером.</span>
</p>
</blockquote><h3>
<span>Тесты безопасности</span>
</h3><p>
<a href="https://github.com/hyoo-ru/crowd.hyoo.ru/blob/master/world/world.test.ts"><span>Тесты</span></a><span> запускаются автоматически при сборке проекта. В них проверяется как функциональность, так и безопасность.</span>
</p><h2>
<span>Технические детали</span>
</h2><h3>
<span>Unit - атомарный кусочек информации</span>
</h3><p>
<img src="https://github.com/hyoo-ru/crowd.hyoo.ru/raw/master/diagram/unit-bin.svg" alt="">
</p><h3>
<span>Содержимое юнита</span>
</h3><p>
<span>Каждый юнит содержит:</span>
</p><ul>
<li>
<p>
<strong><span>Land</span></strong><span> - область атомарной синхронизации</span>
</p>
</li><li>
<p>
<strong><span>Auth</span></strong><span> - автор юнита</span>
</p>
</li><li>
<p>
<strong><span>Head+Self</span></strong><span> - идентификатор юнита</span>
</p>
</li><li>
<p>
<strong><span>Prev+Next</span></strong><span> - частичный порядок среди соседних юнитов</span>
</p>
</li><li>
<p>
<strong><span>Time+Aeon</span></strong><span> - время внесения данных в систему</span>
</p>
</li><li>
<p>
<strong><span>Size+Data</span></strong><span> - сырые данные</span>
</p>
</li><li>
<p>
<strong><span>Sign</span></strong><span> - авторская цифровая подпись</span>
</p>
</li>
</ul><p>
<span>Устаревшие юниты отсеиваются, а оставшиеся упорядочиваются одинаково на всех узлах в соответствии с CvRDT подходом.</span>
</p><h3>
<span>Протокол синхронизации</span>
</h3><p>
<img src="https://github.com/hyoo-ru/crowd.hyoo.ru/raw/master/diagram/sync.svg" alt="">
</p><p>
<span>При установлении соединения, партнёры обмениваются векторными часами, говорящими о том, какие юниты у них есть есть.</span>
</p><p>
<span>Получив показания часов партнёра, каждый узел начинает слать ему те юниты, которых у того нет.</span>
</p><p>
<span>Каждый узел шлёт сердцебиения для поддержания соединения.</span>
</p><p>
<span>Долгое отсутствие сообщений от партнёра приводит к обрыву связи.</span>
</p><p>
<span>Обрыв связи - штатная ситуация, не влияющая на корректность синхронизации.</span>
</p><p>
<span>Каждый узел может синхронизироваться со множеством других узлов одновременно.</span>
</p><hr><h1>
<span>Запуск демонстрации</span>
</h1><h2>
<span>Предусловия</span>
</h2><ul>
<li>
<p>
<span>Установлена NodeJS.</span>
</p>
</li>
</ul><h2>
<span>Установка зависимостей</span>
</h2><pre>
<span>npm install
</span>
</pre><h2>
<span>Старт дев сервера</span>
</h2><pre>
<span>yarn start
</span>
</pre><h2>
<span>Старт сервера синхронизации</span>
</h2><pre>
<span>yarn start tec/server
</span><span>node tec/server/-/node.js port=9090
</span>
</pre><h2>
<span>Запуск эмуляторов сенсоров</span>
</h2><p>
<span>В каждом новом окне создаётся новый контроллер.</span>
</p><pre>
<span>open http://localhost:9080/tec/power/service/-/test.html
</span>
</pre><h2>
<span>Запуск дашборда оператора</span>
</h2><p>
<span>В каждом новом окне создаётся новый пользователь.</span>
</p><pre>
<span>open http://localhost:9080/tec/operator/dash/-/test.html
</span>
</pre><h2>
<span>Запуск административной консоли</span>
</h2><pre>
<span>open http://localhost:9080/tec/domain/admin/-/test.html
</span>
</pre><h2>
<span>Запуск консоли вендора</span>
</h2><pre>
<span>open http://localhost:9080/tec/vendor/manager/-/test.html
</span><span>
</span>
</pre><hr><h1>
<span>Политики безопасности</span>
</h1><p>
<span>Администратор добавляет идентификаторы операторов и контроллеров в справочники, где даёт им понятные имена:</span>
</p><p>
<img src="https://i.imgur.com/boAhUHF.png" alt="">
</p><p>
<img src="https://i.imgur.com/Rt0eD3M.png" alt="">
</p><p>
<span>Политики задаются в следующем виде:</span>
</p><p>
<img src="https://i.imgur.com/5lyaImc.png" alt="">
</p><p>
<span>Тут указывается какой пользователь имеет право управлять каким контроллером.</span>
</p><p>
<span>Права можно только выдавать, но нельзя забирать. У контроллера может быть реализована специальная задача для сброса прав к дефолтному состоянию, когда права есть только у администратора.</span>
</p><p>
<span>Важно отметить, что права на управление не дают возможность подделывать показания.</span>
</p><hr><h1>
<span>Команда $mol_team</span>
</h1><table>
<tr>
<td>
<p>
<span>Персонаж</span>
</p>
</td><td>
<p>
<span>Роль</span>
</p>
</td><td>
<p>
<span>Связь</span>
</p>
</td>
</tr><tr>
<td>
<p>
<span>Дмитрий Карловский</span>
</p>
</td><td>
<p>
<span>Проектировщик</span>
</p>
</td><td>
<p>
<span>https://t.me/nin_jin</span>
</p>
</td>
</tr><tr>
<td>
<p>
<span>Роман Коплёнов</span>
</p>
</td><td>
<p>
<span>Разработчик</span>
</p>
</td><td>
<p>
<span>https://t.me/koplenov</span>
</p>
</td>
</tr><tr>
<td>
<p>
<span>Павел Зубков</span>
</p>
</td><td>
<p>
<span>Разработчик</span>
</p>
</td><td>
<p>
<span>https://t.me/zubkov_p</span>
</p>
</td>
</tr>
</table><hr><p>
<a href="https://page.hyoo.ru/#!=ynydaf_bogu48"><span>Актуальный оригинал на $hyoo_page.</span></a>
</p>
