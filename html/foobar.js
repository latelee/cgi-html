/*
 *创建异步访问对象
 */
function createXHR() 
{
    var xhr;

    try 
    {
        xhr = new ActiveXObject("Msxml2.XMLHTTP");
    } 
    catch (e) 
    {
        try 
        {
            xhr = new ActiveXObject("Microsoft.XMLHTTP");
        }
        catch(E) 
        {
            xhr = false;
        }
    }

    if (!xhr && typeof XMLHttpRequest != 'undefined') 
    {
        xhr = new XMLHttpRequest();
    }

    return xhr;
}

function getSysInfo() 
{
    xhr = createXHR();

    if(xhr)
    {
        // 如果不与后台交互，则这样做可以在页面上显示内容
        //document.getElementById("sys_info").innerHTML = '250';
        xhr.onreadystatechange=onGetSysInfo;
        // 发送get请求给后台（cgi响应），返回值在onGetTime处理器
        //test.cgi后面跟个cur_time参数是为了防止Ajax页面缓存
        xhr.open("GET", "cgi-bin/test.cgi?sysinfo=" + new Date().getTime());
        xhr.send(null);
    }
}

function onGetSysInfo()
{
    if (xhr.readyState == 4 && xhr.status == 200) 
    {
        var ret = xhr.responseText;

        if(ret != null && ret.length > 0)
        {
            document.getElementById("sys_info").innerHTML = ret;
        }
    }
}

