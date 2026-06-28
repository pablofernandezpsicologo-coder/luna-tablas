Set WShell = CreateObject("WScript.Shell")
WShell.Run "python -m http.server 8765", 0, False
WScript.Sleep 1200
WShell.Run "chrome.exe http://localhost:8765", 1, False
